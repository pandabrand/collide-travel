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
          let div_doc = document.createElement('div');
          //create map title div and text
          let map_title_div = document.createElement('div');
          map_title_div.className = 'cc-map-title';
          let map_title_text = document.createTextNode(city.displayName);
          map_title_div.appendChild(map_title_text);
          cc_info.appendChild(map_title_div);

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
              let comments = response.artist-comments;

              let location_title_div = document.createElement('div');
              location_title_div.className = 'cc-location-table-row-title';
              let location_title = document.createTextNode(location.name);
              location_title_div.appendChild(location_title);
              location_row.appendChild(location_desc_div);

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

              cc_info.appendChild(location_row);
            }
          }
        }
      });
    }
  }
})();// hi there
