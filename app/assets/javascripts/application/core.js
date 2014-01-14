var getView = function(view){
  var partial = view.split('#');
  return '/partials/' + partial[0] + '/' + partial[1] + '.html';
};

// метод для скрытия вьюх
hide_all_view = function(view_show, array){
  console.log('depricated hide_all_view');
  if(array == undefined){
    _.each(view_show, function(num, key){ view_show[key] = false; });
  } else {
    _.each(view_show, function(num, key){ _.include(array, key) ? null : view_show[key] = false; });
  }
  return view_show;
};

all_close = function(view_show, array){
  if(array == undefined){
    _.each(view_show, function(num, key){ view_show[key] = 'hide'; });
  } else {
    _.each(view_show, function(num, key){ _.include(array, key) ? null : view_show[key] = 'hide'; });
  }
  return view_show;
};

// создание маркеров
create_place_markers = function(data){
  maps_json = _.map(data, function(elem){
    res = {
      id: elem.id,
      position: new google.maps.LatLng(elem.longitude, elem.latitude),
    };
    return res;
  });
  return maps_json;
}