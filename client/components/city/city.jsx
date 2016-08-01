import React from 'react';

import CityGuide from './city-guide.jsx';
import ArtistCityGuide from './artist-city-guide.jsx';
import CityMap from '../home/google-maps.jsx';

const getCity = (homeCity, locations, artist, artistComments, props, dispatch) => {
  const header = Object.keys(artist).length > 0 ? <ArtistCityGuide artist={artist} city={homeCity} /> : <CityGuide city={homeCity} />;
  return <div id="main">
          {header}
          <CityMap homeCity={homeCity} locations={locations} artist={artist} artistComments={artistComments} props={props} dispatch={dispatch}/>
         </div>;
}

export const City = ( {homeCity, locations, artist, artistComments, props, dispatch} ) =>
(
  <div>{getCity(homeCity, locations, artist, artistComments, props, dispatch)}</div>
);
