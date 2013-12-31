PlaceApp.controller(
  'PlaceController',
  function ( $location, $scope, $http, $route ) {
    $scope.view_partial = {};
    $scope.view_show = {};

    // главная страница
    home_index = function(){
      console.log($scope.view_show)
      // $scope.view_show = hide_all($scope.view_show);
      $scope.view_partial.index = getView('home#index');
      $scope.view_show.index = true;
    };

    // роутинг
    // http://www.sitepoint.com/call-javascript-function-string-without-using-eval/
    changeRoute = function(){
      window[$route.current.action]();
      // sub_wrapper_class_set();

      // if($route.current.controller != 'rooms'){
      //   create_markers()
      // }
    }

    changeRoute();

    $scope.$on(
      '$routeChangeSuccess',
      function( $currentRoute, $previousRoute ){
        changeRoute();
      }
    );
  }
);