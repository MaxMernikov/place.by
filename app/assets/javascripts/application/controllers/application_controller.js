PlaceApp.controller(
  'ApplicationController',
  function ($route, $scope) {

    $scope.$on(
      '$routeChangeSuccess',
      function( $currentRoute, $previousRoute ){
        $scope.controller = getView('layouts#' + $route.current.controller);
      }
    );

  }
);