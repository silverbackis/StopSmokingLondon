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
  newJSON = {
    "type": "FeatureCollection",
    "features": []
  },
  feature = {
    "type": "Feature",
    "properties": {
      "name": null
    },
    "geometry": {}
  },
  colors = ['#1866b8', '#0a76e5', '#31a9ff', '#b2d6fa'],//
  geoJSON,
  center = {lat: 51.4820, lng: -0.09},
  searchMarker = null,
  selectedFeature = null,
  search = function(postcode)
  {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: postcode,
      region: 'GB',
      bounds: map.getBounds()
    }, searchResult);
  },
  searchResult = function(results, status) 
  {
    $("#confirmPostcode").removeClass("disabled"); 
    // callback with a status and result
    if (status == google.maps.GeocoderStatus.OK) 
    {
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
      
      $("#boroughCard").show().removeClass("card-outline-warning card-outline-success");
      if(!selectedFeature)
      {
        //alert("Sorry, the address entered does not appear to be within the London boroughs. Please try again.");
        $("#selectedBorough").html("Postcode Not Found Within London Boroughs");
        $("#boroughCard").addClass("card-outline-warning");
        $("#liveIn").hide();
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
        $("#selectedBorough").html(selectedFeature.getProperty('name'));
        $("#boroughCard").addClass("card-outline-success");
        $("#liveIn").show();
      }
    }
    else
    {
      alert("Sorry, there was an error looking up that postcode. Please check it and try again.");
    }
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

      map.data.loadGeoJson('/bundles/app/maps/GeoJson.json', {}, function(features){
        //console.log(feature);
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
        var postcode = $("#postcodeInput").val();
        if(postcode==='')
        {
          return;
        }
        if(!$btn.hasClass("disabled"))
        {
          $btn.addClass("disabled");
          search(postcode);
        }
      });

      $("#postcodeInput").on('keypress', function (e) {
          if (e.keyCode == 13) {
            $("#confirmPostcode").trigger("click");
          }
      });

      $(function(){
        var $map = $('#map'),
        updateMap = function(breakpoint)
        {
          switch(breakpoint)
          {
            case "xl":
              $map.css({
                height: '500px',
                width: '630px'
              });
              google.maps.event.trigger(map, "resize");
              map.setZoom(10);
            break;
            default:
              $map.css({
                height: '280px',
                width: '312px'
              });
              google.maps.event.trigger(map, "resize");
              map.setZoom(9);
            break;
          }
          map.setCenter(center);
        };
        viewport.breakpointChanged(updateMap);
        updateMap(viewport.current());
      });
    }
  };  
  return public;
})(jQuery, ResponsiveBootstrapToolkit, BootstrapModalAlerts.alert, BootstrapModalAlerts.confirm);