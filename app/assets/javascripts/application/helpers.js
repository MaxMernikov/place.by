// хелпер для получения пути для паршала
var getView = function(view){
  var partial = view.split('#');
  return '/partials/' + partial[0] + '/' + partial[1] + '.html';
};

// скрываем все блоки кроме тех что присутствуют в массиве
hide_all = function(view_show, array){
  if(array == undefined){
    _.each(view_show, function(num, key){ view_show[key] = false; });
  } else {
    _.each(view_show, function(num, key){ _.include(array, key) ? null : view_show[key] = false; });
  }
  view_show
};

function disableMovement(disable) {
  // var mapOptions;
  // if (disable) {
  //   mapOptions = {
  //     draggable: false,
  //     scrollwheel: false,
  //     disableDoubleClickZoom: true,
  //     zoomControl: false,
  //     overviewMapControl: false
  //   };
  // } else {
  //   mapOptions = {
  //     draggable: true,
  //     scrollwheel: true,
  //     disableDoubleClickZoom: false,
  //     zoomControl: true,
  //     overviewMapControl: true
  //   };
  // }
  // map.setOptions(mapOptions);
};

function xs() { return $("#media_width").css("width") === "0px"; }
function sm() { return $("#media_width").css("width") === "768px"; }
function md() { return $("#media_width").css("width") === "960px"; }

function addAnimateAndHover() {
  if ( sm() || md() ) $('body').addClass('hover')
};

// (function(){var d=$(document.getElementsByTagName("body")),b=[],c=function(a){a.data().hasOwnProperty("$scope")&&angular.forEach(a.data().$scope.$$watchers,function(a){b.push(a)});angular.forEach(a.children(),function(a){c($(a))})};c(d);console.log(b.length)})();