PlaceApp.controller(
  'LocationController',
  ['$location', '$rootScope', '$scope', '$timeout', '$log', '$http',
    function ($location, $rootScope, $scope, $timeout, $log, $http) {

      $scope.getCoordinateAddress = function(){
        if($scope.currentAddress != null ){
          $http.get('/service/coordinate?address='+ $scope.currentAddress).success(function(data){
            changeCurrentLocation(data);
          });
        };
      };

      function changeCurrentLocation(data, apply) {
        coordinate = new google.maps.LatLng(data.latitude, data.longitude);
        setDefaultMarker(coordinate);
        setMapCenter(coordinate);
      };

      $scope.showCoordinateGeo = ((geo_position_js.init()) ? true : false);

      $scope.getCoordinateGeo = function(){
        geo_position_js.getCurrentPosition(
          success_callback,
          error_callback,
          { enableHighAccuracy: true }
        );
      };

      function success_callback(result) {
        changeCurrentLocation({ latitude: result.coords.latitude, longitude: result.coords.longitude }, true);
      };

      function error_callback(p) {
        alert('error=' + p.message);
      };
    }
  ]
)

