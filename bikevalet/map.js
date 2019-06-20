// code for the valet map

mapboxgl.accessToken = 'pk.eyJ1IjoibXBtY2tlbm5hOCIsImEiOiJfYWx3RlJZIn0.v-vrWv_t1ytntvWpeePhgQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  hash: true,
  center: [-122.43491, 37.772],
  zoom: 11.31
});



map.on('load', function() {
map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function(error, image) {
if (error) throw error;

let icon_url = "http://mpmckenna8.github.io/leaflettuts/SFbikeValet-mapicon.png"

map.loadImage(icon_url, function(error, valet_image) {

  let geojson_url = "./valet_locations.geojson";

fetch(geojson_url)
  .then((response) => {
    return response.json( )
  })
  .then(valet_geojson => {
    console.log('the valet geojson is: ', valet_geojson)

    map.addSource( 'valet_locations', {type:"geojson", data: valet_geojson})

    map.addLayer({
      id: "valet_locations",
      type: "symbol",
      "source": "valet_locations",
      "layout": {
        "icon-image": "valet",
        "icon-size": 1.25

      }
    })


    setUpSidebar(valet_geojson.features, map)


  })



map.addImage('valet',  valet_image )





map.on('mouseenter', 'valet_locations', function () {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'valet_locations', function () {
  map.getCanvas().style.cursor = '';
});

map.on('click', 'valet_locations', function (e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var description = e.features[0].properties.description;


  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  let popup_content = "<div class='popupdiv'><h4>" + e.features[0].properties.bike_valet + "</h4><p>" + description + "</p></div>"

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(popup_content)
    .addTo(map);
})



});
})
});
