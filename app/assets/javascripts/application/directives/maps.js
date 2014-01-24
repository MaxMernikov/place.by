PlaceApp.directive('map', ['$location', function ($location) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      map_short_change = false;
      collection_change = false;
      // position_change = false;

      scope.map_show = !xs();
      $(window).resize(function() {
        scope.$apply(function () {
          scope.map_show = !xs();
        });
        // console.log('start map ' + scope.map_show)
      });


      // if(!xs()){ init_map() };

      $(window).resize(function() {
        // if(xs()){
        //   scope.map_show = false;
        //   // map_compile(false);
        // } else {
        //   scope.map_show = true;
        //   // map_compile(true);
        // }
        // console.log(scope.map_show)
        // if(!xs()){ init_map() } else {
        //   google.maps.event.clearListeners(window, 'resize');
        //   delete(map);
        //   element.html('').attr('style', '')
        // };
        // set_map_short();
      });

      // function init_map () {
      //   if(window.map == undefined){
      //     map = new google.maps.Map(element[0], mapOptions);
      //     google.maps.event.addDomListener(window, 'resize', function() {
      //       initialize_center();
      //     });
      //   };
      // };

      function init_map () {
        // scope.map_show = true;
        // map_compile(true)
      }

      scope.$watch('map_show', function (value) {
        if(value){
          if(window.map == undefined){
            map_init();
          };
          set_positon();
          set_markers();
        };
      });

      function map_init(){
        map = new google.maps.Map(element[0], mapOptions);
        google.maps.event.addDomListener(window, 'resize', function() {
          initialize_center();
        });
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

          google.maps.event.addListener(marker, 'mouseover', function (e) {
            $('a.marker[href="' + e.target.pathname + '"]').parent().addClass('hover')
          });

          google.maps.event.addListener(marker, 'mouseout', function (e) {
            $('a.marker[href="' + e.target.pathname + '"]').parent().removeClass('hover')
          });

          markers.push(marker);
        });

        if(xs()){
          _.each(markers, function (marker) {
            marker.setMap(map);
          })
        } else {
          markerCluster = new MarkerClusterer(map, markers, mcOptions);
        }

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