var PlaceApp = angular.module('PlaceApp', [
  'ngRoute',
  'ngAnimate',
  'pasvaz.bindonce'
]);

PlaceApp.config(['$httpProvider',
  function($httpProvider){
    authToken = $('meta[name="csrf-token"]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = authToken;
}]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', { action: 'home_index' }).
      when('/rooms', { action: 'rooms_index' }).
      when('/rooms/new', { action: 'rooms_new' }).
      when('/rooms/:id', { action: 'rooms_show' }).
      when('/:categoryId', {}).
      when('/:categoryId/:placeId', {}).
      otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
}]);
