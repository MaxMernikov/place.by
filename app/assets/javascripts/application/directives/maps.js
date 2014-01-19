PlaceApp.directive('map', [function () {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      map_short_change = false;
      collection_change = false;
      position_change = false;

      if(!xs()){ init_map() };

      $(window).resize(function() {
        if(!xs()){ init_map() } else {
          google.maps.event.clearListeners(window, 'resize');
          delete(map);
          element.html('').attr('style', '')
        };
        set_map_short();
      });

      function init_map () {
        if(window.map == undefined){
          map = new google.maps.Map(element[0], mapOptions);
          google.maps.event.addDomListener(window, 'resize', function() {
            initialize_center();
          });
        };
      };

      // смещаем центр карты
      function initialize_center (){
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center)
      }

      // // сдвигаем все в центр
      // function map_scroll_to_root () {
      //   map.panTo(new google.maps.LatLng(53.9060089, 27.5550941));
      //   if(map.getZoom() != 12) map.setZoom(12);
      // }

      // установка ширины карты
      function set_map_short() {
        if (scope.map_short){
          if ( lg() || md()) { element.css('right', 460) }
          else if (sm()) { element.css('right', 320) }
          else { element.css('right', 0) };
        } else { element.css('right', 0) };
        if(window.map != undefined) initialize_center();
      };

      // map_short_change - при инициализации old_value равен new_value делаю проверку на запрос после инициализации
      scope.$watch('map_short', function (new_value, old_value) {
        if (!map_short_change || new_value != old_value) set_map_short();
        if (!map_short_change) map_short_change = true;
      });

      // отмечаем что коллекция была изменена и что можно рендерить на карту при необходимости
      scope.$watch('places', function (value) {
        collection_change = true;
        set_markers();
      });


      function set_markers() {
        if (!xs()) {
          var markers = [];
          _.each(scope.places, function (place) {
            marker = new MarkerWithLabel({
              position: new google.maps.LatLng(place.longitude, place.latitude),
              labelContent: '<a href="/pool/' + place.id + '"class = " marker room"></a>',
              labelAnchor: new google.maps.Point(20, 20),
              labelClass: 'place_label2',
              icon: {}
            });

            // google.maps.event.addListener(marker, "click", function (e) {
            //   $('a.marker[href="' + e.target.pathname + '"]').parent().addClass('show');
            //   $location.path(e.target.pathname);
            //   $rootScope.view_from_map = true;
            //   $scope.$apply()
            // });

            // google.maps.event.addListener(marker, 'mouseover', function (e) {
            //   $('a.marker[href="' + e.target.pathname + '"]').parent().addClass('hover')
            // });

            // google.maps.event.addListener(marker, 'mouseout', function (e) {
            //   $('a.marker[href="' + e.target.pathname + '"]').parent().removeClass('hover')
            // });

            markers.push(marker);
          });

          markerCluster = new MarkerClusterer(map, markers, mcOptions);
        }
      };

      scope.$watch('current_position', function (value) {
        if(!_.isEmpty(value)){
          console.log(value)
          position_change = true;
          set_positon();
        }
      }, true);

      function set_positon() {
        if(!xs()){
          if (scope.current_position.zoom != undefined)
            { map.setZoom(scope.current_position.zoom); }
          if (scope.current_position.coordinate != undefined){ 
            map.panTo(new google.maps.LatLng(
              scope.current_position.coordinate[0],
              scope.current_position.coordinate[1]
            ));
          };
        }
      }

    }
  }
}])