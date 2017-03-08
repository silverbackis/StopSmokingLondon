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
  search = function(searchText)
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
      if(searchText === '')
      {
        $("#confirmPostcode").removeClass("disabled");
        $("#boroughCard").hide();
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
  },
  searchResult = function(results, status) 
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
            strokeWeight: 4,
            zIndex: 2
          });
          return false;
        }
      });
      // Check if the marker point is within any borough, if not display error
      
      
      if(!selectedFeature)
      {
        showBoroughBox("No Address Found Within London Boroughs", true);
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
          $sessionSelect.selectpicker('val', selectedFeature.getProperty('name')).trigger("change");
        }
        else
        {
          enableInputs();
        }
      }
    }
    else if(status === google.maps.GeocoderStatus.ZERO_RESULTS)
    {
      showBoroughBox("Sorry, No Results Found", true);
    }
    else if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT)
    {
      if(totalAttempts >= maxAttempts)
      {
        showBoroughBox("Sorry, we've reached out search limit. Please try again later or select your borough instead.", true);
      }
      else
      {
        showBoroughBox("Retrying... Attempt "+(totalAttempts+1), true);
        lastSearch = null;
        setTimeout(function(){
          search();
        }, 900);
      }
      
    }
    else
    {
      showBoroughBox("Sorry, there was an error searching for that address. The status returned was "+status+".", true);
    }
  },
  enableInputs = function()
  {
    $("#confirmPostcode").removeClass("disabled");
    $searchInput.prop('disabled', false);
  }, 
  showBoroughBox = function(msg, error)
  {
    $("#boroughCard").show().removeClass("card-outline-warning card-outline-success");
    if(error)
    {
      $("#selectedBorough").html(msg);
      $("#boroughCard").addClass("card-outline-warning");
      $("#liveIn").hide();
    }
    else
    {
      $("#selectedBorough").html(msg);
      $("#boroughCard").addClass("card-outline-success");
      $("#liveIn").show();
    }
    enableInputs();
  },
  public = {
    initialised: false,
    init: function()
    {
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

      // http://stackoverflow.com/questions/3081021/how-to-get-the-center-of-a-polygon-in-google-maps-v3/13772082#13772082
      google.maps.Polygon.prototype.poly_getBounds = function(){
        var bounds = new google.maps.LatLngBounds();
        this.getPath().forEach(function(element,index){bounds.extend(element);});
        return bounds;
      };

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
        public.initialised = true;
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

      $(function(){
        // Fix because gridlines appear in safari when positioning google map with subpixels/percent
        // Also mobile/desktop google map resize
        var updateRealMapLeft = function()
        {
          $map.css({
            left: Math.round($(".google-map.spacer").offset().left)+"px"
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
        $sessionSelect.on("change", function(){
          var borough = $sessionSelect.val();
          showBoroughBox(borough);
          search(borough);
        });
      });
    }
  };  
  return public;
})(jQuery, ResponsiveBootstrapToolkit, BootstrapModalAlerts.alert, BootstrapModalAlerts.confirm);