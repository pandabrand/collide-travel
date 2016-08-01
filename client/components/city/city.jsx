import React from 'react';

import CityGuide from './city-guide.jsx';
import ArtistCityGuide from './artist-city-guide.jsx';
import CityMap from '../home/google-maps.jsx';

const getCity = (homeCity, locations, artist, props, dispatch) => {
  const header = Object.keys(artist).length > 0 ? <ArtistCityGuide artist={artist} city={homeCity} /> : <CityGuide city={homeCity} />;
  return <div id="main">
          {header}
          <CityMap homeCity={homeCity} locations={locations} props={props} dispatch={dispatch}/>
         </div>;
}

export const City = ( {homeCity, locations, artist, props, dispatch} ) =>
(
  <div>{getCity(homeCity, locations, artist, props, dispatch)}</div>
);
