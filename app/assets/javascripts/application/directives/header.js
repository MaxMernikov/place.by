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
          document.getElementsByTagName('body')[0].style.overflow = 'hidden';
          // document.addEventListener('touchmove',function(e){e.preventDefault();},false);
          document.addEventListener('touchmove', disabledTouchmove,false);

          // $('div').css('overflow', 'hidden')
        } else {
          document.getElementsByTagName('html')[0].style.overflow = '';
          document.removeEventListener('touchmove', disabledTouchmove, false);
        }
      }

      function disabledTouchmove(e){
        
        var lastX,
    $display = $('#display');
$(document).bind('touchmove mousemove', function (e) {
    var currentX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
    if (currentX > lastX) {
        $display.html('moving right');
    } else {
        $display.html('moving left');
    }
    lastX = currentX;
});
      }
    }
  }
}]);