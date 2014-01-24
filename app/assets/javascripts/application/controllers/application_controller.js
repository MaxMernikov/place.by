PlaceApp.controller(
  'ApplicationController',
  function ($route, $scope, $routeParams) {
    $scope.map_short = false;
    $scope.map_show = false;

    $scope.xs = xs();

    $(window).resize(function() {
      $scope.xs = xs();
      // console.log($scope.map_show + ' +++ ' + xs())
      console.log(!xs() || !$scope.map_show)
    });

    // $scope.map_control = false;

    $scope.$on(
      '$routeChangeSuccess',
      function( $currentRoute, $previousRoute ){
        controller = $route.current.controller || 'place'
        $scope.controller = getView('layouts#' + controller);
        $scope.category = $routeParams.categoryId;
      }
    );

    $scope.$on('$viewContentLoaded', addAnimateAndHover());

    $scope.translate = function(category){
      var result = translate(category);
      if(result != undefined ) return translate(category);
    };

    // (function() {

    // }).call(this);

    $scope.mapControl = function(){
      $scope.map_control = !$scope.map_control
    }

  }
);