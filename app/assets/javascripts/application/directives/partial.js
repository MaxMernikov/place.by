PlaceApp.directive("partial", ["$compile", '$http', '$templateCache', '$parse', function ($compile, $http, $templateCache, $parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      scope.$watch('view_partial.' + attrs.template, function (value) {
        if (value) {
          loadTemplate( getView(value) );
          setTimeout(function() { element.addClass('show') }, 300);
        }
      });

      scope.$watch('view.' + attrs.template, function (value) {
        if (value == 'hide') {
          element.removeClass('show')
          setTimeout(function() {
            scope.$apply(function(){
              scope.view[attrs.template] = false;
            });
          }, 300);
        }
      });

      function loadTemplate(template) {
        $http.get(template, { cache: $templateCache })
          .success(function(templateContent) {
            element.html($compile(templateContent)(scope));
          });
        }
      }
    }
  }]
);