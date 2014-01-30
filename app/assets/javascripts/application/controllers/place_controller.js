PlaceApp.controller(
  'PlaceController',
  function ( $location, $scope, $http, $route, $rootScope, $routeParams, $templateCache, $cacheFactory ) {
    $scope.view_partial = {};
    $scope.view = {};
    $rootScope.current_category = {};
    $scope.current_position = {};
    $scope.view_from_map = false; //переход на страницу по клику на маркер

    // главная страница
    home_index = function(){
      $scope.view = all_close($scope.view);
      $scope.view.index = 'show';
      $scope.view_partial.index = 'home#index';
      $scope.map_short = false;
      $scope.visible_show_map = false;
    };

    categories_index = function(){
      $scope.view = all_close($scope.view, ['result']);
      $scope.map_short = true;
      $scope.visible_show_map = true;

      if ($rootScope.current_category.slug == undefined || $scope.places.length < 2 || $rootScope.current_category.slug != $route.current.params.categoryId ) {

        $http.get('/' + $route.current.params.categoryId + '.json').success(function(data) {
          $rootScope.current_category = { title: data.title, slug: data.slug };
          $scope.places = data.places;
          $scope.place_hash = data.hash;
        });
      }

      // двигаем карту на центр
      $scope.current_position.zoom = root_zoom;
      $scope.current_position.coordinate = root_coordinate;

      $scope.view_partial.result = 'categories#index';
      $scope.view.result = 'show';
    };

    // детали места
    place_show = function(){
      $scope.view = all_close($scope.view, ['result']);
      $scope.view_partial.detail = 'place#show';

      $scope.map_short = true;
      $scope.visible_show_map = true;

      $http.get('/' + $routeParams.categoryId + '/'+ $routeParams.placeId + '.json').success(function(data) {
        $scope.place = data;

        if ($rootScope.current_category.slug == undefined) {
          $rootScope.current_category = { title: data.category.title, slug: data.category.slug };
          $scope.places = [data];
        };

        if ($scope.view_from_map == true && !xs()) {$scope.view_from_map = false}
        else{
          $scope.current_position.zoom = 17;
          $scope.current_position.coordinate = [data.longitude, data.latitude]
        }

        // делаем инфу видимой если клиент мобильный
        if(xs()) $scope.map_show = false;
      });

      if ($scope.view.detail != 'show') $scope.view.detail = 'show';


    };

    $scope.edit = function () {
      $scope.view_partial.detail = 'place#edit';
      $scope.edit_place = angular.copy($scope.place);
    }

    $scope.cancelEdit = function () {
      $scope.view_partial.detail = 'place#show';
    }

    $scope.placeUpdate = function () {
      $http.put('/' + $routeParams.categoryId + '/'+ $routeParams.placeId, $scope.edit_place).success(function(data){
        if(data == 'ok'){
          $scope.view_partial.detail = 'place#success_update';
        }
        console.log(data);
      });
    }

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