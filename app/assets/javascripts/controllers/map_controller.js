var markerCluster
PlaceApp.controller(
  'MapController',
  function ($scope, $rootScope) {

    // var setDefaultMarker = function(loc){
    //   console.log('new log' + loc)
    // }

    var myLoc = new google.maps.LatLng(53.9060089, 27.5550941);
    var styles = [
      {
      //   stylers: [
      //     { hue: "#00ffe6" },
      //     { saturation: -20 }
      //   ]
      // },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      },{
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [
          { color: '#e8eeee' }
        ]
      },{
        featureType: "water",
        stylers: [
          { hue: "#00c3ff" },
          { saturation: -42 }
        ]
      },{
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    var mapOptions = {
      // zoom: 18,
      zoom: 12,
      center: myLoc,
      styles: styles
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    $rootScope.$watch('map_markers', function () {
      // console.log($rootScope.map_markers);
      var markers = [];

      _.each($rootScope.map_markers, function(marker){
        // console.log(marker);
        marker = new MarkerWithLabel({
          position: marker.position,
          // position: new google.maps.LatLng(53.877332 + marker.id/5000, 27.5341),
          labelContent: '<div>' + marker.rooms_count + ' комнат за $433 </div>',
          labelAnchor: new google.maps.Point(22, 20),
          labelClass: "labels",
          icon: {}
        });

        google.maps.event.addListener(marker, "click", function (e) { console.log('dsf'); });
        markers.push(marker);
      });

      // console.log(markers);
      if(!_.isUndefined(markerCluster)){
        markerCluster.clearMarkers()
        console.log(_.isUndefined(markerCluster));
      // }else{
      //   var markerCluster
      }

      // markerCluster.clearMarkers()
      markerCluster = new MarkerClusterer(map, markers);
    });

    // var marker = new google.maps.Marker({
    //     position: myLoc,
    //     map: map,
    //     title: 'fddf'
    //   });


    // createMarker(2, new google.maps.LatLng(53.877432, 27.5341), "<div>$466</div>");

    // var markers = [];
    // markers_count = 3;
    // for (i = 0; i < markers_count; i++) {
    //   marker = new MarkerWithLabel({
    //     position: new google.maps.LatLng(53.877332 + i/5000, 27.5341),
    //     labelContent: '<div>$433 </div>',
    //     labelAnchor: new google.maps.Point(22, 20),
    //     labelClass: "labels",
    //     icon: {}
    //   });
    //   google.maps.event.addListener(marker, "click", function (e) { console.log('dsf'); });
    //   markers.push(marker);
    // };

    // var markerCluster = new MarkerClusterer(map, markers);

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

// var createMarker = function(pos, content){
//   marker = new MarkerWithLabel({
//     position: pos,
//     labelContent: content,
//     labelAnchor: new google.maps.Point(22, 20),
//     labelClass: "labels",
//     icon: {}
//   });
//   google.maps.event.addListener(marker, "click", function (e) { console.log('dsf'); });
//   marker
// };