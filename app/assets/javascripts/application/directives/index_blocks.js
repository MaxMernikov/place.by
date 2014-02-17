PlaceApp.directive("indexBlocks", [function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var msnry = new Masonry( element[0], {
        itemSelector: '.block__'
      });
      msnry.onresize()
    }
  }
}]);