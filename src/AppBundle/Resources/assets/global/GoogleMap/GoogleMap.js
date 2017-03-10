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
  boroughsLocation = "London";

  function search(searchText)
  {
    if(!searchText)
    {
      searchText = $searchInput.val();
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
        $("#confirmPostcode").removeClass("disabled");
        $sessionSelect.selectpicker('val', '');
        $nextSteps.addClass("hidden");
        selectChanged();
        return;
      }

      $searchInput.prop('disabled', true);

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address: searchText,
        region: 'GB',
        bounds: map.getBounds()
      }, searchResult);
    }
    else
    {
      $("#confirmPostcode").removeClass("disabled");
      $searchInput.prop('disabled', false);
    }
  }

  function searchResult(results, status) 
  {
    totalAttempts++;
    
    // callback with a status and result
    if (status == google.maps.GeocoderStatus.OK) 
    {
      totalAttempts = 0;

      var resultLatLng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
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
            strokeWeight: 3,
            zIndex: 2
          });
          return false;
        }
      });
      // Check if the marker point is within any borough, if not display error
      
      if(!selectedFeature)
      {
        showBoroughInfo("Sorry, we couldn't find that within the "+boroughsLocation+" boroughs", true);
      }
      else
      {
        // Add the marker at the new position
        searchMarker = new google.maps.Marker({
          position: resultLatLng,
          map: map,
          animation: google.maps.Animation.DROP
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
    else if(status === google.maps.GeocoderStatus.ZERO_RESULTS)
    {
      showBoroughInfo("Sorry, No Results Found", true);
    }
    else if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT)
    {
      if(totalAttempts >= maxAttempts)
      {
        showBoroughInfo("Sorry we've reached our limit to search for "+boroughsLocation+" boroughs.", true);
      }
      else
      {
        showBoroughInfo("Retrying... Attempt "+(totalAttempts+1), true);
        lastSearch = null;
        setTimeout(function(){
          search();
        }, 1100);
      }
    }
    else
    {
      showBoroughInfo("Sorry, there was an error searching for that address. The status returned was "+status+".", true);
    }
  }

  function selectChanged(boroughFeature)
  {
    var featureProperties = {},
    borough = $sessionSelect.val();
    if(borough === '')
    {
      $("#boroughCard").hide();
    }
    else
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
      }
      else
      {
        boroughFeature.forEachProperty(function(val, key)
        {
          featureProperties[key] = val;
        });
      }
      showBoroughInfo(featureProperties);
      
      // Search will only happen if not a duplicate search so this is OK to call here.
      // When search completes it triggers this selectChanged function. Primary flow is for dropdown change to happen
      // and info to display immediately, before the map search is done
      search(borough);
    }
  }

  function enableInputs()
  {
    $("#confirmPostcode").removeClass("disabled");
    $searchInput.prop('disabled', false);
  }

  function showBoroughInfo(msg, error)
  {
    // Show the card - remove success and warning styles
    $("#boroughCard").show().removeClass("card-outline-warning card-outline-success");
    
    // Add warning styles for error
    if(error)
    {
      $("#boroughCard").addClass("card-outline-warning");
      $("#liveIn").hide();
      $("#selectedBorough").html(msg);
    }
    else
    {
      var boroughProps = msg,
      $telCont,
      $message,
      $websiteLink,
      message,
      fallbackAppend = '<br /><br /><b>But don\'t worry, you can still call the Stop Smoking London helpline.</b>',
      noServiceFallback = 'We have not received information back from <b>' + boroughProps.name + '</b> about your local stop smoking services yet.' + fallbackAppend,
      $tel = $('<a />', {
        class: 'tel'
      });
      $("#boroughCard").addClass("card-outline-success");
      $("#liveIn").show();
      $("#selectedBorough").html(boroughProps.name);

      var showTelephone = function($telCont)
      {
        if(boroughProps.service.telephone)
          {
            if(null !== boroughProps.service.telephone)
            {
              var telNumbers = JSON.parse(boroughProps.service.telephone);
              $tel
                .clone()
                  .attr("href", "tel:+44"+telNumbers[0].replace(/\s/g, '').substr(1))
                  .html(telNumbers[0]).appendTo($telCont);
            }
          }
      };

      if($advisorCard.length > 0)
      {
        // We have an advisor info card to fill in
        $telCont = $(".tel-cont", $advisorCard).empty();
        $message = $(".message", $advisorCard);

        if(null === boroughProps.service)
        {
          message = noServiceFallback;
        }
        else if(!boroughProps.service.specialistAdvisors)
        {
          message = 'It appears <b>' + boroughProps.name + '</b> does not have local stop smoking telephone advisors available.' + fallbackAppend;
        }
        else
        {
          var serviceName = boroughProps.service.name ? ', <b>' + boroughProps.service.name + '</b>' : '';
          message = 'Here is some information for your local <a href="#">Stop Smoking Service</a>' + serviceName + ' in <b>' + boroughProps.name + '</b>';
          showTelephone($telCont);
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
          message = noServiceFallback;
        }
        else if(boroughProps.service.gpPrescription)
        {
          message = 'Your local GP will be able to discuss your situation and prescribe you the most appropriate medication.<br /><br /><b>Alternatively, why not speak to a Stop Smoking London advisor who will be able to recommend one you can pick up at your local pharmacy?</b>';
          showTelephone($telCont);
        }
        else
        {
          console.log(boroughProps.service.gpPrescription);
          message = 'Unfortunately, your local GP will not be able to prescribe your stop smoking medication.<br /><br /><b>Why not speak to a Stop Smoking London advisor who will be able to recommend one you can pick up at your local pharmacy?</b>';
        }
        $message.html(message);
      }

      $nextSteps.removeClass("hidden");
    }
    enableInputs();
  }

  function initMap()
  {
    // Only initialise once - public function so extra control
    // Called from the google maps async loaded script
    if(initCalled)
    {
      return;
    }
    initCalled = true;

    // Initialise the map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: center,
      styles: [
        {
          "featureType": "all",
          "stylers": [
            { 
              "color": "#eceeef",
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

    // Set token as variable and remove the attribute
    var token = $map.attr("data-token");
    $map.removeAttr("data-token");
    // Get GeoJson with token in GET
    $.getJSON('/boroughs.json?token=' + token, function(LoadedGeoJson)
    {
      // Set local variable with the GeoJson data - parameters have all the info we need out of database
      GeoJson = LoadedGeoJson;
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
        case "xl":
          $(".google-map").css({
            height: '500px',
            width: '630px'
          });
          google.maps.event.trigger(map, "resize");
          map.setZoom(10);
        break;
        default:
          $(".google-map").css({
            height: '280px',
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
    $(window).on("resize orientationchange", updateRealMapLeft);

    // Setup the selectbox change event
    $sessionSelect.on("change", selectChanged);

    $(".search-type-toggle").on("click", function(e)
    {
      e.preventDefault();
      $(this).parents(".toggle-area").hide();
      $($(this).attr("data-toggle")).show();
    });
  }

  var public = {
    init: initMap
  };  
  return public;
})(jQuery, ResponsiveBootstrapToolkit, BootstrapModalAlerts.alert, BootstrapModalAlerts.confirm);