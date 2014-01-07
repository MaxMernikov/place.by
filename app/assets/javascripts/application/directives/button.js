PlaceApp.directive(
  'triggerButton',
  function(){
    return {
      restrict: 'E',
      templateUrl: '/partials/directives/trigger_button.html'
    };
  }
);

PlaceApp.directive(
  'slider',
  function () {
    return {
      restrict: 'A',
      link: function ($scope, $elem, attrs) {
        $elem.slider({
          orientation: 'vertical',
          range: true,
          min: 0,
          max: 100,
          values: [23, 89],
          slide: function( event, ui ) {
            $scope.room_filter.min_cost = ui.values[0];
            $scope.room_filter.max_cost = ui.values[1];
            $scope.$apply();
          }
        });
      }
    }
  }
);