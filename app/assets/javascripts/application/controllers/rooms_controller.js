PlaceApp.controller(
  'RoomsController',
  function( $locale, $http, $rootScope, $scope, $route, $routeParams, $filter ){
    $scope.partial = {};
    $scope.view = {};
    $scope.room_filter = {};
    $scope.sub_wrapper_class = null;
    $scope.menu = {};

    hide_all = function(array){
      if(array == undefined){
        _.each($scope.view, function(num, key){ $scope.view[key] = false; });
      } else {
        _.each($scope.view, function(num, key){ _.include(array, key) ? null : $scope.view[key] = false; });
      }
    };

    // сжатый или нет блок с картой
    sub_wrapper_class_set = function(){
      if( !$scope.view.result && !$scope.view.detail){
        $scope.sub_wrapper_class = null
      }
    };

    // создание маркеров
    create_markers = function(data){
      maps_json = _.map(data, function(elem){
        res = {
          id: elem.id,
          rooms_count: elem.rooms_count,
          position: new google.maps.LatLng(elem.longitude, elem.latitude),
          price: elem.price
        };
        return res;
      });
      $rootScope.map_markers = maps_json;
    }

    // создание объявления
    rooms_new = function(){
      hide_all();
      $scope.partial.main = getView('rooms#form');
      $scope.view.main = true;
    };


    // все комнаты
    rooms_index = function(){
      hide_all(['result']);
      if($scope.view.result != true){
        $scope.partial.result = getView('rooms#index');
        $scope.partial.filter = getView('rooms#filter');

        $http.get('/rooms.json').success(function(data) {
          $scope.rooms = $scope.filtered_rooms = data;
          create_markers(data);
        });
        $scope.view.result = true;
      };
      $scope.view.filter = true;
      $scope.sub_wrapper_class = 'short';

      console.log( 'rooms ' + _.size($.cache) )
    };

    // одна комната
    rooms_show = function(){
      hide_all(['result']);
      $scope.partial.detail = getView('rooms#show');
      $http.get('/rooms/'+ $routeParams.id + '.json').success(function(data) {
        $scope.room = data;
        $scope.view.detail = true;
      });
    };


    // menu
    $scope.open_menu = function(partial){
      _.each($scope.menu, function(num, key){ partial == key ? null : $scope.menu[key] = false });
      $scope.menu[partial] = !$scope.menu[partial];
    }

    // filter toogle
    $scope.$watch('room_filter', function(){
      $scope.filtered_rooms = $filter('filter')($scope.rooms, $scope.room_filter)
      create_markers($scope.filtered_rooms);
    }, true);

    $scope.toggleSelected = function(type){
      $scope.room_filter[type] == undefined ? $scope.room_filter[type] = true : $scope.room_filter[type] = undefined
    }

    // роутинг
    // http://www.sitepoint.com/call-javascript-function-string-without-using-eval/
    changeRoute = function(){
      window[$route.current.action]();
      sub_wrapper_class_set();

      if($route.current.controller != 'rooms'){
        create_markers()
      }
    }

    changeRoute();

    $scope.$on(
      '$routeChangeSuccess',
      function( $currentRoute, $previousRoute ){
        changeRoute();
      }
    );

    // localize
    $scope.roomForms = {
      0: 'нет комнат',
      one: '{} комната',
      few: '{} комнаты',
      many: '{} комнат',
      other: '{} комнат'
    };
  }
);

