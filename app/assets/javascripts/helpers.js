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

// инициалицация карты

// стили для карты
var myLoc = new google.maps.LatLng(53.9060089, 27.5550941);
var styles = [
  {
  //   stylers: [
  //     { hue: "#00ffe6" },
  //     { saturation: -20 }
  //   ]
  // },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      { color: '#e8eeee' }
    ]
  },{
    featureType: "water",
    stylers: [
      { hue: "#00c3ff" },
      { saturation: -42 }
    ]
  },{
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]
  }
];

var mapOptions = {
  maxZoom: 17,
  minZoom: 11,
  zoom: 13,
  center: myLoc,
  zoomControlOptions: { style: 'SMALL' },
  // overviewMapControl: false, вид
  panControl :false,
  scaleControl: false,
  streetViewControl: false,
  styles: styles
};

init_map = function(){
  if(window.map == undefined){
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }

  var centerPosition = map.getCenter();  //get the center position
  google.maps.event.trigger(map, 'resize');
  map.setCenter(centerPosition);
  console.log(map.changed)
}

// сдвигаем все в центр
map_scroll_to_root = function(){
  map.panTo(new google.maps.LatLng(53.9060089, 27.5550941));
  if(map.getZoom() != 12) map.setZoom(12);
}

// смещаем центр карты
initialize_center = function(){
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center);
  console.log('centred')
}

var n = 0;
test = function(){
  console.log(n)
  n += 1
  initialize_center()
  if(n < 40) setTimeout('test()', 100);
}