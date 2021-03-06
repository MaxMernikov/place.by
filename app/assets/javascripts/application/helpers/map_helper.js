// стили для карты
var root_coordinate = [53.9060089, 27.5550941],
    root_zoom = 12,
    map_center = new google.maps.LatLng(53.9060089, 27.5550941);

// инициалицация карты
var map_styles = [
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
  zoom: 12,
  center: map_center,
  zoomControlOptions: { style: 'SMALL' },
  // overviewMapControl: false, вид
  panControl :false,
  scaleControl: false,
  streetViewControl: false,
  styles: map_styles
};

// cтили для MarkerClusterer
mcOptions = {
  imagePath: {},
  styles: [{ width: 57, height: 57}],
  gridSize: 55
}
