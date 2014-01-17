PlaceApp.directive("header", [function () {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      scope.open_collapse = false;
      init_header();

      $(window).resize(function() {
        init_header()
      });

      function init_header() {
        if(xs()){
          element.find('#full_header').hide();
          element.find('#mobile_header').show();
        } else {
          element.find('#mobile_header').hide();
          element.find('#full_header').show();
        };
      }

      scope.openCollapse = function(){
        scope.open_collapse = !scope.open_collapse

        if(scope.open_collapse) {
          $('div').css('overflow', 'hidden' )
          document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        } else {
          document.getElementsByTagName('body')[0].style.overflow = 'auto';
        }
      }
    }
  }
}]);