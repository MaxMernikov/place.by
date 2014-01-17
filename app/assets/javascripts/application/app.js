var PlaceApp = angular.module('PlaceApp', [
  'ngRoute',
  'ngTouch',
  'pasvaz.bindonce'
  // 'ngAnimate',
])

PlaceApp.config(['$httpProvider',
  function($httpProvider){
    authToken = $('meta[name="csrf-token"]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = authToken;
}]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', { action: 'home_index' }).
      when('/rooms', { action: 'rooms_index', controller: 'rooms' }).
      when('/rooms/new', { action: 'rooms_new', controller: 'rooms' }).
      when('/rooms/:id', { action: 'rooms_show', controller: 'rooms' }).
      when('/:categoryId', { action: 'categories_index' }).
      when('/:categoryId/:placeId', { action: 'place_show' }).
      otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
}]);