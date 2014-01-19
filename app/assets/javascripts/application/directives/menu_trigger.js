PlaceApp.directive("menuTrigger", [function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var $body = document.body
      element[0].addEventListener('click', open_close_menu);
      document.getElementById('shroud').addEventListener('click', open_close_menu);
      $('#slide-menu a').click(open_close_menu);


      function open_close_menu () {
        $body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
      }
    }
  }
}]);