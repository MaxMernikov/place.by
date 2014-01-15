PlaceApp.directive('map', [function () {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      init_map2();
      // if(!xs()){ init_map2() };

      function init_map2 () {
        if(window.map == undefined){
          map2 = new google.maps.Map(element[0], mapOptions);
          // google.maps.event.addDomListener(window, "resize", function() {
          //   initialize_center();
          // });
        };
      };

      // сдвигаем все в центр
      function map_scroll_to_root () {
        map.panTo(new google.maps.LatLng(53.9060089, 27.5550941));
        if(map.getZoom() != 12) map.setZoom(12);
      }

    }
  }
}])