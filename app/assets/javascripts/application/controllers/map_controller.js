var markerCluster
PlaceApp.controller(
  'MapController',
  function ($scope, $rootScope, $location) {

    mcOptions = {
      imagePath: {},
      styles: [{ width: 57, height: 57 }],
      gridSize: 55
    }

    init_map();

    $rootScope.$watch('map_markers', function () {
      var markers = [];

      _.each($rootScope.map_markers, function(marker){

        if($rootScope.maker_type == 'place'){
          marker = new MarkerWithLabel({
            position: marker.position,
            labelContent: '<a href="/pool/' + marker.id + '"class = " marker room"></a>',
            labelAnchor: new google.maps.Point(20, 20),
            labelClass: 'place_label2',
            icon: {}
          });
        } else {
          marker = new MarkerWithLabel({
            position: marker.position,
            labelContent: '<a href="/rooms/' + marker.id + '"class = "h_an marker"><span class = "b">' + marker.rooms_count + '</span><i class ="icon"></i><span>$' + marker.price + '</span></a>',
            labelAnchor: new google.maps.Point(22, 20),
            labelClass: "mp_l",
            icon: {}
          });
        }

        google.maps.event.addListener(marker, "click", function (e) {
          $('a.marker[href="' + e.target.pathname + '"]').parent().addClass('show');
          $location.path(e.target.pathname);
          $rootScope.view_from_map = true;
          $scope.$apply()
        });

        google.maps.event.addListener(marker, 'mouseover', function (e) {
          $('a.marker[href="' + e.target.pathname + '"]').parent().addClass('hover')
        });

        google.maps.event.addListener(marker, 'mouseout', function (e) {
          $('a.marker[href="' + e.target.pathname + '"]').parent().removeClass('hover')
        });

        markers.push(marker);
      });

      if(!_.isUndefined(markerCluster)){
        markerCluster.clearMarkers()
      }

      markerCluster = new MarkerClusterer(map, markers, mcOptions);
    });

// map-canvas


    $rootScope.$watch('map_functions', function(){
      if($rootScope.map_functions != undefined){
        _.each($rootScope.map_functions, function(num, key){
          var fn = window[key];
          if (typeof fn === "function") fn.apply(this, num);
        });
        $rootScope.map_functions = undefined;
      }
    })

    // сдвигает карту
    set_relative_center = function(nb, ob){
      map.panBy(nb, ob);
    }

    set_center = function(nb, ob){
      map.panTo(new google.maps.LatLng(nb, ob));
    }

    set_relative_zoom = function(num){
      map.setZoom(map.getZoom() + num);
    }

    set_zoom = function(num){
      map.setZoom(num);
    }

    // map-canvas
    google.maps.event.addDomListener(window, "resize", function() {
      // initialize_center();
    });
  }
)


var setMapCenter = function(coordinate){
  map.panTo(coordinate);
}

var setDefaultMarker = function(coordinate){
  var currentLocation = new google.maps.Marker({
    position: coordinate,
    map: map,
    title: 'currentLocation'
  });
}
