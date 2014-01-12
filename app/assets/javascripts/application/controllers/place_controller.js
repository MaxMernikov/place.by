PlaceApp.controller(
  'PlaceController',
  function ( $location, $scope, $http, $route, $rootScope, $routeParams, $templateCache, $cacheFactory ) {
    init_map();
    $scope.view_partial = {};
    $scope.view_show = {};
    map_changed = false;

    // сжатый или нет блок с картой
    sub_wrapper_class_set = function(){
      if( !$scope.view_show.result && !$scope.view_show.detail){
        $scope.sub_wrapper_class = null
      }
    };

    // главная страница
    home_index = function(){
      $scope.view_show = hide_all_view($scope.view_show);
      $scope.view_partial.index = getView('home#index');
      $scope.view_show.index = true;
      map_changed = false;
    };

    categories_index = function(){
      $scope.view_show = hide_all_view($scope.view_show, ['result']);

      if($scope.view_show.result != true){
        $scope.view_partial.result = getView('categories#index');

        $http.get('/' + $route.current.params.categoryId + '.json').success(function(data) {
          $scope.places = data;
          $rootScope.maker_type = 'place';
          $rootScope.map_markers = create_place_markers(data);
        });
        $scope.view_show.result = true;
      };

      // устанавливаем центр карты
      // 1) пользователь пришел с главной или с иной категории (map_changed = false)
      if(!map_changed || $rootScope.view_from_map != true){
        map_scroll_to_root();

      } else if($rootScope.view_from_map == true){
       $rootScope.view_from_map = false;
      }

      map_changed = true;
      $scope.sub_wrapper_class = 'short';
      map.changed
    }

    // одна комната
    place_show = function(){
      hide_all(['result']);
      $scope.view_partial.detail = getView('place#show');
      // $http(getView('place#show')).then(function (result) {
      //   $templateCache.put('my-dynamic-template', result);
      // });

      $http.get('/' + $routeParams.categoryId + '/'+ $routeParams.placeId + '.json').success(function(data) {
        $scope.place = data;

        // действия если маркеров нет(случай перехода по прямой ссылке)
        if($rootScope.map_markers == undefined){
          $rootScope.maker_type = 'place';
          $rootScope.map_markers = create_place_markers([data]);
          map.setZoom(17);
          map.panTo(new google.maps.LatLng(data.longitude, data.latitude));

        } else if($rootScope.view_from_map != true){
          map.setZoom(17);
          map.panTo(new google.maps.LatLng(data.longitude, data.latitude));
        }

        $scope.view_show.detail = true;
      });

      if($scope.view_show.detail != true){
        $scope.view_show.detail = true;
        $scope.sub_wrapper_class = 'short';
      }
    };

    $scope.edit = function(){
      $scope.view_partial.detail = getView('place#edit');
      // $scope.view_show.detail = false;
      // $scope.view_show.detail = ;
      // $scope.$apply()
    }

    $scope.back = function(){
      $scope.view_partial.detail = getView('place#show');
    }

    // роутинг
    // http://www.sitepoint.com/call-javascript-function-string-without-using-eval/
    changeRoute = function(){
      window[$route.current.action]();
      sub_wrapper_class_set();
    }

    changeRoute();

    $scope.$on(
      '$routeChangeSuccess',
      function( $currentRoute, $previousRoute ){
        changeRoute();
      }
    );

    $scope.$watch('sub_wrapper_class', function(){
      initialize_center();
    });

    $scope.scroll_to_root = function(){
      map_scroll_to_root();
    }

    // localize
    $scope.placeForms = {
      0: 'нет результатов',
      one: '{} результат',
      few: '{} результата',
      many: '{} результатов',
      other: '{} результатов'
    };
  }
);