(function(global) {
  attachAndCreate();

  function attachAndCreate() {
    let cc_info = document.getElementById('cc-info');
    if(!cc_info) {
      return;
    } else {
      $.ajax({
        type: 'GET',
        url: 'https://collide-travel.herokuapp.com/cc-city/chicago',
        success: function(response) {
          console.dir(response);
          let city = response.cities[0];
          city_coord = city.location;
          //make map
          let map_div = document.createElement('div');
          map_div.className = 'cc-google-map';
          let map_loader_div = document.createElement('div');
          map_loader_div.id = 'cc-map';
          map_loader_div.className = 'cc-map';
          map_div.appendChild(map_loader_div);
          cc_info.appendChild(map_div);

          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.defer = true;
          s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCCZXJra6h1WdMewRSZ2SJ9K0Rt1lurRIk&callback=initMap';
          var x = document.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);

          //create location scoller
          let location_scroller_div = document.createElement('div');
          location_scroller_div.className = 'location-wrapper';
          cc_info.appendChild(location_scroller_div);

          //create map title div and text
          let map_title_div = document.createElement('div');
          map_title_div.className = 'cc-map-title';
          let map_title_text = document.createTextNode(city.displayName);
          map_title_div.appendChild(map_title_text);
          location_scroller_div.appendChild(map_title_div);

          //make location table
          let locations = response.locations;
          if(locations) {
            let locations_div = document.createElement('div');
            locations_div.className = 'cc-location-table';
            for(let x = 0; x < locations.length; x++) {
              let location = locations[x];
              let location_row = document.createElement('div');
              location_row.className = 'cc-location-table-row';
              let artists = response.artists;
              let comments = response['artist-comments'];

              let location_title_div = document.createElement('div');
              location_title_div.className = 'cc-location-table-row-title';
              let location_title = document.createTextNode(location.name);
              location_title_div.appendChild(location_title);
              location_row.appendChild(location_title_div);

              let location_desc_div = document.createElement('div');
              location_desc_div.className = 'cc-location-table-row-desc';
              let location_desc = document.createTextNode(location.description);
              location_desc_div.appendChild(location_desc);
              location_row.appendChild(location_desc_div);

              let location_addr_div = document.createElement('div');
              location_addr_div.className = 'cc-location-table-row-addr';
              let location_addr = document.createTextNode(location.address);
              location_addr_div.appendChild(location_addr);
              location_row.appendChild(location_addr_div);

              location_scroller_div.appendChild(location_row);
            }
          }
        }
      });
    }
  }


})();// hi there

let map,city_coord;
function initMap() {
  map = new google.maps.Map(document.getElementById('cc-map'), {
    center: city_coord,
    zoom: 8
  });
}
