import React from 'react';

import CityGuideComponent from './city-guide.jsx';
import ArtistCityGuideComponent from './artist-city-guide.jsx';
import CityMapsComponent from './city-map.jsx';
import CityArtistsTableComponent from './city-artists-table.jsx';

const getCity = (homeCity, locations, artists, props, dispatch) => {
  return <div id="main" className="container">
          <CityGuideComponent city={homeCity} />
          {/*<CityMapComponent homeCity={homeCity} locations={locations} artist={artist} artistComments={artistComments} props={props} dispatch={dispatch}/>*/}
          <div className="container-fluid full-fluid city-guides">
            <div className="row no-gutters city-guides-row">
              <CityArtistsTableComponent city={homeCity} artists={artists}/>
              <CityMapsComponent dispatch={dispatch} props={props} city={homeCity} locations={locations}/>
            </div>
         </div>
         </div>;
}

export const CityComponent = ( {homeCity, locations, artists, props, dispatch} ) =>
(
  <div>{getCity(homeCity, locations, artists, props, dispatch)}</div>
);
