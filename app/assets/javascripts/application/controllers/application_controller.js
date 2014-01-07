PlaceApp.controller(
  'ApplicationController',
  function ($route, $scope) {

    $scope.$on(
      '$routeChangeSuccess',
      function( $currentRoute, $previousRoute ){
        controller = $route.current.controller || 'place'
        $scope.controller = getView('layouts#' + controller);
      }
    );

  }
);