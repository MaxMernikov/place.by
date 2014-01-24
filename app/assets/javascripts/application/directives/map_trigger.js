PlaceApp.directive("mapTrigger", [function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      scope.changeShowMap = function(type) {
        if(type == 'map'){
          scope.map_show = true;
          $("[ng-click=\"changeShowMap('map')\"]").addClass('active');
          $("[ng-click=\"changeShowMap('info')\"]").removeClass('active');
        }else{
          scope.map_show = false;
          $("[ng-click=\"changeShowMap('map')\"]").removeClass('active')
          $("[ng-click=\"changeShowMap('info')\"]").addClass('active')
        }
      };

    }
  }
}]);