var PlaceApp = angular.module('PlaceApp', [
  'ngRoute',
  'ngAnimate',
  'pasvaz.bindonce'
])

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

PlaceApp.config(['$httpProvider',
  function($httpProvider){
    authToken = $('meta[name="csrf-token"]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = authToken;
}]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', { action: 'home_index', controller: 'place' }).
      when('/rooms', { action: 'rooms_index', controller: 'rooms' }).
      when('/rooms/new', { action: 'rooms_new', controller: 'rooms' }).
      when('/rooms/:id', { action: 'rooms_show', controller: 'rooms' }).
      when('/:categoryId', {}).
      when('/:categoryId/:placeId', {}).
      otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
}]);
