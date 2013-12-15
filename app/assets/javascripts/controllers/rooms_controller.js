PlaceApp.controller(
  'RoomsController',
  function( $locale, $http, $rootScope, $scope, $route, $routeParams ){
    $scope.view_partial = {}
    $scope.view_show = {}
    // $scope.sub_wrapper_class = null;

    hide_all = function(array){
      if(array == undefined){
        _.each($scope.view_show, function(num, key){ $scope.view_show[key] = false; });
      } else {
        _.each($scope.view_show, function(num, key){ _.include(array, key) ? null : $scope.view_show[key] = false; });
      }
    };

    // сжатый или нет блок с картой
    sub_wrapper_class_set = function(){
      if($scope.view_show.result != true || $scope.view_show.detail != true){
        $scope.sub_wrapper_class = null
      }
    };

    // главная страница
    home_index = function(){
      hide_all();
      $scope.view_partial.index = getView('home#index');
      $scope.view_show.index = true;
    };

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
          $scope.rooms = data;
          maps_json = _.map(data, function(elem){
            res = {
              id: elem.id,
              rooms_count: elem.rooms_count,
              position: new google.maps.LatLng(elem.longitude, elem.latitude)
            };
            return res;
          });
          $rootScope.map_markers = maps_json;
        });
        $scope.view_show.result = true;
        $scope.view_show.filter = true;
        $scope.sub_wrapper_class = 'short';
      };
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



    // // прорисовщик вьюх, сделано для анимации
    // $rootScope.$watch('show_view', function () {
    //   console.log('show_view = ' + $rootScope.show_view);
    //   $rootScope.show_view != undefined ? $scope[$rootScope.show_view]['show'] = true : null;
    // });

    // роутинг
    $scope.$on(
      '$routeChangeSuccess',
      function( $currentRoute, $previousRoute ){
        // http://www.sitepoint.com/call-javascript-function-string-without-using-eval/
        window[$route.current.action]();
        sub_wrapper_class_set();
      }
    );


    // метод для получения линка до вьюхи
    var getView = function(view) {
      $scope.view = view;
      var partial = view.split( '#' );
      return '/partials/' + partial[0] + '/' + partial[1] + '.html';
    };

    $scope.roomForms = {
      0: 'нет комнат',
      one: '{} комната',
      few: '{} комнаты',
      many: '{} комнат',
      other: '{} комнат'
    };

  }
);