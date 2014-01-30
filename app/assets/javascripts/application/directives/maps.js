PlaceApp.directive('map', ['$location', function ($location) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      map_short_change = false;
      place_hash = null;

      scope.map_show = !xs();
      // $(window).resize(function() {
      //   scope.$apply(function () {
      //     scope.map_show = !xs();
      //   });
      //   // console.log('start map ' + scope.map_show)
      // });


      // if(!xs()){ map_init() };

      scope.$watch('map_show', function (value) {
        if(value){
          if(window.map == undefined){
            map_init();
          };
          set_positon();
          set_markers();
        };
      });

      function showMarkers() {
        var bounds = map.getBounds();
      };

      function map_init(){
        map = new google.maps.Map(element[0], mapOptions);
        google.maps.event.addDomListener(window, 'resize', function() {
          initialize_center();
        });
        google.maps.event.addListener(map, 'idle', showMarkers);
      }

      // смещаем центр карты
      function initialize_center (){
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center)
      }

      // установка ширины карты
      function set_map_short() {
        element[0].className = (scope.map_short)? 'short' : '';
        if(window.map != undefined) initialize_center();
      };

      // map_short_change - при инициализации old_value равен new_value делаю проверку на запрос после инициализации
      scope.$watch('map_short', function (new_value, old_value) {
        if (!map_short_change || new_value != old_value) set_map_short();
        if (!map_short_change) map_short_change = true;
      });

      // отмечаем что коллекция была изменена и что можно рендерить на карту при необходимости
      scope.$watch('places', function (value) {
        if(!xs() && !_.isEmpty(value)){
          set_markers();
        }
      }, true);

      function set_markers() {
        if(place_hash != scope.place_hash){
          var markers = [];
          _.each(scope.places, function (place) {
            marker = new MarkerWithLabel({
              position: new google.maps.LatLng(place.longitude, place.latitude),
              labelContent: '<a href="/pool/' + place.id + '"class = " marker room"></a>',
              labelAnchor: new google.maps.Point(20, 20),
              labelClass: 'place_label2',
              icon: {}
            });

            google.maps.event.addListener(marker, "click", function (e) {
              console.log($('.place_label2.show'));
              $('.place_label2.active').removeClass('active').addClass('show');
              $('a.marker[href="' + e.target.pathname + '"]').parent().addClass('active');
              $location.path(e.target.pathname);
              // указываем что переход произведен при клике на карте, а значит карту не перерисовывать
              scope.$apply(function () {
                scope.view_from_map = true;
              });
            });

            // анимация при наведении
            if(!xs()){
              google.maps.event.addListener(marker, 'mouseover', function (e) {
                $('a.marker[href="' + e.target.pathname + '"]').parent().addClass('hover')
              });

              google.maps.event.addListener(marker, 'mouseout', function (e) {
                $('a.marker[href="' + e.target.pathname + '"]').parent().removeClass('hover')
              });
            };

            markers.push(marker);
          });

          if(xs()){
            if(window.mgr == undefined){
              mgr = new MarkerManager(map);
              google.maps.event.addListener(mgr, 'loaded', function() {
                mgr.addMarkers(markers, 0);
                mgr.refresh();
              });
            }else{
              mgr.clearMarkers();
              mgr.addMarkers(markers, 0);
              mgr.refresh();
            };

          } else {
            markerCluster = new MarkerClusterer(map, markers, mcOptions);
          }

          place_hash = scope.place_hash;

        };
      };


      // отмечаем что расположение было изменено и что можно рендерить на карту при необходимости
      scope.$watch('current_position', function (value) {
        if(!xs() && !_.isEmpty(value)){
          set_positon();
        }
      }, true);

      function set_positon() {
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
}])