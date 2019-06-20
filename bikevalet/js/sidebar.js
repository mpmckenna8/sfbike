// code for setting up the sidebar

console.log('sidebar loaded')
function setUpSidebar( features, map ) {
  let events_div = document.getElementById('events_div');
  for( let i of features ) {
    console.log(i);

    var single_event_div = document.createElement("div");

    single_event_div.setAttribute('class', 'event')
    single_event_div.innerHTML = "<h4>" + i.properties['bike_valet'] + "</h4>"

    single_event_div.addEventListener('click', (e) => {

      let selecteds = document.getElementsByClassName('selected')

      if (selecteds.length > 0) {
        selecteds[0].setAttribute('class', 'event')
      }

      console.log(e, this)
      e.target.setAttribute('class', 'event selected')

      map.flyTo({
        center: i.geometry.coordinates
      }).on('end', () => {
        console.log('done flyting to the thing')
      })

      var pophtml = "<div class='popupdiv'><h3>" + i.properties.bike_valet + "</h3> <p>" + i.properties.description + "</p></div>"

      var popup = new mapboxgl.Popup()
        .setLngLat((i.geometry.coordinates))
        .setHTML(pophtml)
        .addTo(map);
    })

    events_div.appendChild(single_event_div)


  }
}
