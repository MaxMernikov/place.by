PlaceApp.directive("header", [function () {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      scope.open_collapse = false;
      init_header();

      $('#two').click(function(){
        alert('ds');
      })

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
        console.log(scope.open_collapse)
        main_wrap = document.getElementsByClassName('main_wrap')[0]

        if(scope.open_collapse) {
          main_wrap.style.left = '250px';
          main_wrap.style.right = '-250px';
          main_wrap.style.overflow = 'hidden';
        } else {
          main_wrap.style.left = 0;
          main_wrap.style.right = 0;
        }
      }
    }
  }
}]);