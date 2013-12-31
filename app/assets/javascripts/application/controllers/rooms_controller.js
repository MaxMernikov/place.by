PlaceApp.controller(
  'RoomsController',
  function( $locale, $http, $rootScope, $scope, $route, $routeParams, $filter ){
    $scope.view_partial = {};
    $scope.view_show = {};
    $scope.room_filter = {};
    $scope.sub_wrapper_class = null;
    $scope.menu = {};

    hide_all = function(array){
      if(array == undefined){
        _.each($scope.view_show, function(num, key){ $scope.view_show[key] = false; });
      } else {
        _.each($scope.view_show, function(num, key){ _.include(array, key) ? null : $scope.view_show[key] = false; });
      }
    };

    // сжатый или нет блок с картой
    sub_wrapper_class_set = function(){
      if( !$scope.view_show.result && !$scope.view_show.detail){
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
      $scope.view_partial.main = getView('rooms#form');
      $scope.view_show.main = true;
    };


    // все комнаты
    rooms_index = function(){
      hide_all(['result']);
      if($scope.view_show.result != true){
        $scope.view_partial.result = getView('rooms#index');
        $scope.view_partial.filter = getView('rooms#filter');

        $http.get('/rooms.json').success(function(data) {
          $scope.rooms = $scope.filtered_rooms = data;
          create_markers(data);
        });
        $scope.view_show.result = true;
      };
      $scope.view_show.filter = true;
      $scope.sub_wrapper_class = 'short';

      console.log( 'rooms ' + _.size($.cache) )
    };

    // одна комната
    rooms_show = function(){
      hide_all(['result']);
      $scope.view_partial.detail = getView('rooms#show');
      $http.get('/rooms/'+ $routeParams.id + '.json').success(function(data) {
        $scope.room = data;
        $scope.view_show.detail = true;
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

