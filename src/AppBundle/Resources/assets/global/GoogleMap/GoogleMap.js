var GoogleMap = (function($, viewport, alert, confirm){
  var bootstrap4Divs = {
    'xs': $('<div class="device-xs d-block hidden-sm-up"></div>'),
    'sm': $('<div class="device-sm d-block hidden-xs-down hidden-md-up"></div>'),
    'md': $('<div class="device-md d-block hidden-sm-down hidden-lg-up"></div>'),
    'lg': $('<div class="device-lg d-block hidden-md-down hidden-xl-up"></div>'),
    'xl': $('<div class="device-xl d-block hidden-lg-down"></div>')
  };    
  viewport.use('bootstrap4', bootstrap4Divs);

  var map,
  colors = ['#1866b8', '#0a76e5', '#31a9ff', '#b2d6fa'],//
  center = {lat: 51.4820, lng: -0.09},
  searchMarker = null,
  selectedFeature = null,
  lastSearch = null,
  maxAttempts = 3,
  totalAttempts = 0,
  GeoJson,
  $map = $('#map'),
  $sessionSelect = $("#sessionSelect"),
  $searchInput = $("#postcodeInput"),
  initCalled = false,
  pageIntent = null,
  $advisorCard = $("#advisorCard"),
  $medicineCard = $("#medicineCard"),
  $nextSteps = $("#nextSteps"),
  boroughsLocation = "London",
  searchToken,
  geocoder,
  ResponseMessages,
  markerIcon,
  markerIconSmall;
  
  function gaTrack(obj)
  {
    if(typeof ga!='undefined')
    {
      ga('send', obj);
    }
    else
    {
      console.log("Google analytics not available. Object attempted to send", obj);
    }
  }

  function hideAllResults()
  {
    $("#confirmPostcode").removeClass("disabled");
    $sessionSelect.selectpicker('val', '');
    $nextSteps.addClass("hidden");
    $("#boroughCard").hide();
    selectChanged();
  }

  function search(searchText, dropdown)
  {
    if(!searchText)
    {
      searchText = $searchInput.val();
      gaTrack({
        hitType: 'event',
        eventCategory: 'Google Map Search',
        eventAction: 'Query',
        eventLabel: searchText
      });
    }
    if(null === lastSearch || lastSearch.toLowerCase() !== searchText.toLowerCase())
    {
      lastSearch = searchText;

      // Unset any selected feature
      if(selectedFeature)
      {
        map.data.overrideStyle(selectedFeature, selectedFeature.getProperty('originalColors'));
        selectedFeature = null;
      }

      // Unset the marker if already present
      if(searchMarker)
      {
        searchMarker.setMap(null);
      }

      // Reset if the search field is empty
      if(searchText === '')
      {
        hideAllResults();
        return;
      }

      $searchInput.prop('disabled', true);

      if(!geocoder)
      {
        geocoder = new google.maps.Geocoder();
      }
      geocoder.geocode({
        address: searchText,
        region: 'GB',
        bounds: map.getBounds()
      }, function(results, status){
        searchResult(results, status, searchText, dropdown);
      }); 
    }
    else
    {
      $("#confirmPostcode").removeClass("disabled");
      $searchInput.prop('disabled', false);
    }
  }

  function searchResult(results, status, searchText, dropdown) 
  {
    totalAttempts++;
    
    // callback with a status and result
    if (status === google.maps.GeocoderStatus.OK)
    {
      totalAttempts = 0;
      var resultLatLng;
      $.each(results, function(){
        if(typeof this.geometry.location.lat == 'function')
        {
          resultLatLng = new google.maps.LatLng(this.geometry.location.lat(), this.geometry.location.lng());
        }
        else
        {
          // if we request from our own server again
          resultLatLng = new google.maps.LatLng(this.geometry.location.lat, this.geometry.location.lng);
        }
        // Loop through all features
        map.data.forEach(function(feature){
          // Get geometry lat lng array from feature
          var geometry = feature.getGeometry(),
          latLngArray = geometry.getArray()[0].getArray();
          // create a temporary polygon becayse we cannot access a polygon class it seems from a feature
          var tempPolygon = new google.maps.Polygon({paths: latLngArray});
          // check if the found marker point is within the new polygon
          if(google.maps.geometry.poly.containsLocation(resultLatLng, tempPolygon))
          {
            // The marker is within the polygon, set it as selected and stop looping
            selectedFeature = feature;
            map.data.overrideStyle(selectedFeature, {
              fillColor: '#15ce75',
              strokeColor: '#FFFFFF',
              strokeWeight: viewport.is("<sm") ? 2 : 3,
              zIndex: 2
            });
            return false;
          }
        });
        if(selectedFeature)
        {
          return false;
        }
      });
      
      // Check if the marker point is within any borough, if not display error
      
      if(!selectedFeature)
      {
        gaTrack({
          hitType: 'event',
          eventCategory: 'Google Map Search',
          eventAction: 'Not Local Borough Result',
          eventLabel: searchText
        });
        if(!dropdown)
        {
          hideAllResults();
        }
        showBoroughInfo(ResponseMessages['map_search_results.result_not_local'], true, dropdown);
      }
      else
      {
        // Add the marker at the new position
        searchMarker = new google.maps.Marker({
          position: resultLatLng,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: viewport.is("<sm") ? markerIconSmall : markerIcon,
          optimized: false
        });

        // Update and show the card displaying the borough
        if($sessionSelect.val() !== selectedFeature.getProperty('name'))
        {
          $sessionSelect.selectpicker('val', selectedFeature.getProperty('name'));
          selectChanged(selectedFeature);
        }
        else
        {
          enableInputs();
        }
      }
    }
    else 
    {
      // Allow same search to be completed again
      lastSearch = null;
      if(!dropdown)
      {
        hideAllResults();
      }
      gaTrack({
        hitType: 'event',
        eventCategory: 'Google Map Search',
        eventAction: 'Error '+status,
        eventLabel: searchText
      });

      if(status === google.maps.GeocoderStatus.ZERO_RESULTS)
      {
        showBoroughInfo(ResponseMessages['map_search_results.no_results'], true, dropdown);
      }
      else if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT)
      {
        if(totalAttempts >= maxAttempts)
        {
          showBoroughInfo(ResponseMessages['map_search_results.limit_reached'], true, dropdown);
        }
        else
        {
          showBoroughInfo(ResponseMessages['map_search_results.retry'].replaceAll("%attempt_count%", totalAttempts+1), true, dropdown);
          lastSearch = null;
          setTimeout(function(){
            search(searchText, dropdown);
          }, 1100);
        }
      }
      else if(status === google.maps.GeocoderStatus.UNKNOWN_ERROR)
      {
        showBoroughInfo(ResponseMessages['map_search_results.unknown_error'], true, dropdown);
      }
      else
      {
        showBoroughInfo(ResponseMessages['map_search_results.other_error'].replaceAll("%status%", status), true, dropdown);
      }
    }
  }

  function selectChanged(boroughFeature)
  {
    var featureProperties = {},
    borough = $sessionSelect.val();
    if(borough !== '')
    {
      if(typeof boroughFeature.getProperty !== 'function')
      {
        // var passed is not a feautre, fine the feature (if dropdown select changed instead of map found and provided it to this function)
        // Skip using the map data in case it hasn't loaded
        $.each(GeoJson.features, function()
        {
          if(this.properties.name === borough)
          {
            featureProperties = this.properties;
            return false;
          }
        });

        gaTrack({
          hitType: 'event',
          eventCategory: 'Borough Dropdown Selected',
          eventAction: borough
        });
      }
      else
      {
        boroughFeature.forEachProperty(function(val, key)
        {
          featureProperties[key] = val;
        });
        gaTrack({
          hitType: 'event',
          eventCategory: 'Google Map Search',
          eventAction: 'Borough Result',
          eventLabel: borough
        });
      }
      gaTrack({
        hitType: 'event',
        eventCategory: 'Borough Information Shown',
        eventAction: borough
      });

      showBoroughInfo(featureProperties);
      
      // Search will only happen if not a duplicate search so this is OK to call here.
      // When search completes it triggers this selectChanged function. Primary flow is for dropdown change to happen
      // and info to display immediately, before the map search is done
      search(borough, true);
    }
  }

  function enableInputs()
  {
    $("#confirmPostcode").removeClass("disabled");
    $searchInput.prop('disabled', false);
  }

  function showBoroughInfo(msg, error, fromDropdown)
  {
    // Show the card - remove success and warning styles
    $("#boroughCard").show().removeClass("card-outline-warning card-outline-success");
    
    // Add warning styles for error
    if(error)
    {
      if(!fromDropdown)
      {
        $("#boroughCard").addClass("card-outline-warning");
        $("#liveIn").hide();
        $("#selectedBorough").html(msg);
      }
      else
      {
        console.warn(msg);
        $("#boroughCard").addClass("card-outline-success");
      }
    }
    else
    {
      var boroughProps = msg,
      $telCont,
      $message,
      message,
      $tel = $('<a />', {
        class: 'tel hidden-sm-down'
      }),
      $telBtn = $('<a />', {
        class: 'hidden-md-up btn btn-success btn-cta btn-tel'
      }).html('<span class="tel-text"></span>');

      $("#boroughCard").addClass("card-outline-success");
      $("#liveIn").show();
      $("#selectedBorough").html(boroughProps.name);

      var showTelephone = function($telCont, key)
      {
        if(!key)
        {
          key = 'telephone';
        }
        var isLink = key==='website';

        if(boroughProps.service[key])
          {
            if(null !== boroughProps.service[key])
            {
              var telNumbers;
              try{
                telNumbers = JSON.parse(boroughProps.service[key]);
              }catch(e){
                telNumbers = [
                  boroughProps.service[key]
                ];
              }
              var href = !isLink ? "tel:+44"+telNumbers[0].replace(/\s/g, '').substr(1) : telNumbers[0].replace(/\s/g, '');
              var html = !isLink ? telNumbers[0] : 'Visit Website';
              var $telClone = $tel.clone();
              var $newBtn = $telBtn.clone();
              if(isLink)
              {
                $telClone.add($newBtn).attr("target", "_blank");
              }
              
              $telClone.attr("href", href)
                  .html(html)
                  .appendTo($telCont);

              
              $(".tel-text", $newBtn).html(html);
              $newBtn
                  .attr("href", href)
                  .appendTo($telCont);
              
              if(!isLink)
              {
                $telCont.removeClass("website");
                $(".stop-smoking-london-info-row").hide();
              }
              else if(!$telCont.hasClass("website"))
              {
                $telCont.addClass("website");
              }
            }
          }
      },
      appendMessage = function(msg)
      {
        return '<br /><br /><b>' + msg + '</b>';
      },
      getMessage = function(group, key)
      {
        var message = ResponseMessages['steps.2.'+group+'.'+key+'.message'];
        if(ResponseMessages['steps.2.'+group+'.'+key+'.append'])
        {
          message += appendMessage(ResponseMessages['steps.2.'+group+'.'+key+'.append']);
        }
        var appendFallback = ResponseMessages['steps.2.'+group+'.'+key+'.append_fallback_message']=='1' || ResponseMessages['steps.2.'+group+'.'+key+'.append_fallback_message']=='true';
        if(
          appendFallback
        )
        {
          message += appendMessage(ResponseMessages['steps.2.all.fallback_message']);
        }
        message = message.replaceAll("%borough%", '<b>' + boroughProps.name + '</b>');
        message = message.replaceAll("%service_name%", (boroughProps.service && boroughProps.service.name) ? ', <b>' + boroughProps.service.name + '</b>' : '');
        return message;
      };

      if($advisorCard.length > 0)
      {
        // We have an advisor info card to fill in
        $telCont = $(".tel-cont", $advisorCard).empty();
        //$websiteCont = $(".website-cont", $advisorCard).empty();
        $message = $(".message", $advisorCard);
        $(".stop-smoking-london-info-row").show();
        var SpecialistPharmacy = null === boroughProps.service ? false : (boroughProps.service.pharmacy_staff && null !== boroughProps.service.telephone);

        if(null === boroughProps.service)
        {
          message = getMessage('all', 'no_information');
        }
        else if(null === boroughProps.service.telephone && boroughProps.service.specialist_advisors)
        {
          message = getMessage('advisor', 'no_telephone');
        }
        else if(boroughProps.service.specialist_advisors)
        {
          message = getMessage('advisor', 'has_advisors');
          showTelephone($telCont);
        }
        else if(SpecialistPharmacy)
        {
          message = getMessage('advisor', 'has_pharmacy_staff');
          showTelephone($telCont);
        }
        else if(boroughProps.service.web_service_available)
        {
          message = getMessage('advisor', 'web_based');
          showTelephone($telCont, 'website');
        }
        else
        {
          message = getMessage('advisor', 'no_service');
        }
        $message.html(message);
      }

      if($medicineCard.length > 0)
      {
        // We have an medicine info card to fill in
        $telCont = $(".tel-cont", $medicineCard);
        $message = $(".message", $medicineCard);
        $telCont.hide();
        if(null === boroughProps.service)
        {
          message = getMessage('all', 'no_information');
        }
        else if(boroughProps.service.gp_prescription)
        {
          message = getMessage('medicine', 'gp_prescription');
        }
        else
        {
          message = getMessage('medicine', 'no_gp');
        }
        $message.html(message);
      }

      $nextSteps.removeClass("hidden");
    }
    enableInputs();
    Tooltips.refresh();
  }

  function initMap()
  {
    $("#confirmPostcode").addClass("disabled");
    $searchInput.prop('disabled', true);
    var placholderText = $searchInput.attr("placeholder");
    $searchInput.attr("placeholder", "Loading...");
    
    // Only initialise once - public function so extra control
    // Called from the google maps async loaded script
    if(initCalled)
    {
      return;
    }
    initCalled = true;

    // Initialise the map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: center,
      styles: [
        {
          "featureType": "all",
          "stylers": [
            { 
              "color": "#f7f7f7",
              "visibility": "off"
            }
          ]
        }
      ],
      //mapTypeControl: false,
      mapTypeId: 'roadmap',
      //streetViewControl: false,
      zoomControl: false,
      clickableIcons: false,
      disableDefaultUI: true,
      draggable: false,
      gestureHandling: "none",
      keyboardShortcuts: false,
      scrollwheel: false
    });

    markerIcon = new google.maps.MarkerImage("/bundles/app/images/icon/pin.png", new google.maps.Size(42, 77), new google.maps.Point(0, 0), new google.maps.Point(10.5, 38.5), new google.maps.Size(21, 38.5));
    markerIconSmall = new google.maps.MarkerImage("/bundles/app/images/icon/pin.png", new google.maps.Size(42, 77), new google.maps.Point(0, 0), new google.maps.Point(7.88, 28.88), new google.maps.Size(15.75, 28.88));

    // Set token as variable and remove the attribute
    var token = $map.attr("data-token");
    $map.removeAttr("data-token");

    searchToken = $map.attr("data-search-token");
    $map.removeAttr("data-search-token");

    // Get GeoJson with token in GET
    // ?token=' + token
    $.getJSON('/boroughs-and-messages.json', function(data)
    {
      $searchInput.prop('disabled', false);
      $("#confirmPostcode").removeClass("disabled");
      $searchInput.attr("placeholder", placholderText);

      // Set local variable with the GeoJson data - parameters have all the info we need out of database
      GeoJson = data.LoadedGeoJson;
      ResponseMessages = data.messages;
      //  Add borough options to dropdown
      $.each(GeoJson.features, function(){
        $sessionSelect.append(
          $("<option />", {
            value: this.properties.name,
            html: this.properties.name
          })
        );
      });
      $sessionSelect.selectpicker('refresh');
      
      // Initialise the map
      var features = map.data.addGeoJson(GeoJson);
      map.data.setStyle({
        fillColor: colors[1],
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: '#FFFFFF',
        strokeOpacity: 1,
        draggable: false,
        clickable: false
      });
      $.each(features, function(index){
        var colIndex = index%colors.length;
        var initStrkIndex = colIndex===1 ? index+1 : index+3;
        var strkIndex = initStrkIndex%colors.length;
        var featureStyle = {
          fillColor: colors[colIndex],
          strokeColor: colors[strkIndex],
          strokeWeight: 1,
          zIndex: 1
        };
        map.data.overrideStyle(this, featureStyle);
        this.setProperty('originalColors', featureStyle);
      });
    });

    $("#confirmPostcode").on("click", function(e){
      e.preventDefault();
      var $btn = $(this);
      if(!$btn.hasClass("disabled"))
      {
        $btn.addClass("disabled");
        search();
      }
    });

    $searchInput.on('keypress', function (e) {
        if (e.keyCode == 13) {
          $("#confirmPostcode").trigger("click");
        }
    });

    $(initDoc);
  }

  function initDoc()
  {
    // Fix because gridlines appear in safari when positioning google map with subpixels/percent
    // Also mobile/desktop google map resize
    var updateRealMapLeft = function()
    {
      var $posElem = $(".google-map-outer"),
      posOffset = $posElem.position(),
      $spacer = $(".google-map.spacer"),
      spacerOffset = $spacer.position();
      $map.css({
        left: Math.round(posOffset.left+spacerOffset.left)+"px"
      });
    },
    updateMap = function(breakpoint)
    {
      switch(breakpoint)
      {
        //case "xl":
          /*$(".google-map").css({
            height: '500px',
            width: '630px'
          });
          google.maps.event.trigger(map, "resize");*/
          //map.setZoom(10);
        //break;
        case "xs":
          $(".google-map").css({
            height: '200px',
            width: '280px'
          });
          google.maps.event.trigger(map, "resize");
          map.setZoom(8);
        break;
        default:
          $(".google-map").css({
            height: '310px',
            width: '312px'
          });
          google.maps.event.trigger(map, "resize");
          map.setZoom(9);
        break;
      }
      updateRealMapLeft();
      map.setCenter(center);
    };
    viewport.breakpointChanged(updateMap);
    updateMap(viewport.current());
    //updateRealMapLeft();
    $(window).on("resize orientationchange", updateRealMapLeft);

    // Setup the selectbox change event
    $sessionSelect.on("change", selectChanged);

    $(".search-type-toggle").on("click", function(e)
    {
      e.preventDefault();
      $(this).parents(".toggle-area").hide();
      $($(this).attr("data-toggle")).show();
      $sessionSelect.selectpicker('toggle');
      $sessionSelect.selectpicker('refresh');
      $sessionSelect.selectpicker('toggle');
    });
  }

  if(!isMobile.any)
  {
    $searchInput.focus();
  }

  var public = {
    init: initMap
  };  
  return public;
})(jQuery, ResponsiveBootstrapToolkit, BootstrapModalAlerts.alert, BootstrapModalAlerts.confirm);