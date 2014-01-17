PlaceApp.controller(
  'PlaceController',
  function ( $location, $scope, $http, $route, $rootScope, $routeParams, $templateCache, $cacheFactory ) {
    $scope.view_partial = {};
    $scope.view = {};
    $rootScope.current_category = {};
    $scope.current_position = {};

    // главная страница
    home_index = function(){
      $scope.view = all_close($scope.view);
      $scope.view.index = 'show';
      $scope.view_partial.index = 'home#index';
      $scope.map_short = false;
    };

    categories_index = function(){
      $scope.view = all_close($scope.view, ['result']);
      $scope.map_short = true;

      if ($rootScope.current_category.slug == undefined || $scope.places.length < 2 || $rootScope.current_category.slug != $route.current.params.categoryId ) {

        $http.get('/' + $route.current.params.categoryId + '.json').success(function(data) {
          $rootScope.current_category = { title: data.title, slug: data.slug };
          $scope.places = data.places;
        });
      }
      $scope.view_partial.result = 'categories#index';
      $scope.view.result = 'show';
    };

      // if($scope.view.result != true){
      //   $scope.view_partial.result = 'categories#index';

      //   $http.get('/' + $route.current.params.categoryId + '.json').success(function(data) {
      //     // будет исспользоваться в хидере и для определения типа маркера
      //     $rootScope.current_category = { title: data.title, slug: data.slug };
      //     $scope.places = data.places;
      //     // $rootScope.maker_type = 'place';
      //     // $rootScope.map_markers = create_place_markers(data);
      //   });
      //   $scope.view.result = 'show';
      // };

      // устанавливаем центр карты
      // 1) пользователь пришел с главной или с иной категории (map_changed = false)
      // if(!map_changed || $rootScope.view_from_map != true){
      //   // map_scroll_to_root();

      // } else if($rootScope.view_from_map == true){
      //  $rootScope.view_from_map = false;
      // }

      // map_changed = true;
      // $scope.sub_wrapper_class = 'short';
      // map.changed

    // одна комната
    place_show = function(){
      $scope.view = all_close($scope.view, ['result']);
      $scope.view_partial.detail = 'place#show';
      $scope.map_short = true;

      $http.get('/' + $routeParams.categoryId + '/'+ $routeParams.placeId + '.json').success(function(data) {
        $scope.place = data;

        if ($rootScope.current_category.slug == undefined) {
          $rootScope.current_category = { title: data.category.title, slug: data.category.slug };
          $scope.places = [data];
        };

        $scope.current_position.zoom = 17;
        $scope.current_position.coordinate = [data.longitude, data.latitude]

      });

      if ($scope.view.detail != 'show') $scope.view.detail = 'show';

    };

    // $scope.edit = function(){
    //   $scope.view_partial.detail = getView('place#edit');
    //   // $scope.view.detail = false;
    //   // $scope.view.detail = ;
    //   // $scope.$apply()
    // }

    // $scope.back = function(){
    //   $scope.view_partial.detail = getView('place#show');
    // }

    // роутинг
    // http://www.sitepoint.com/call-javascript-function-string-without-using-eval/
    function changeRoute() { window[$route.current.action]() }
    changeRoute();

    $scope.$on(
      '$routeChangeSuccess',
      function( $currentRoute, $previousRoute ){
        changeRoute();
      }
    );

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