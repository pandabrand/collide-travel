import React from 'react';

import CityGuideComponent from './city-guide.jsx';
import ArtistCityGuideComponent from './artist-city-guide.jsx';
import CityMapComponent from '../home/google-maps.jsx';

const getCity = (homeCity, locations, artist, artistComments, props, dispatch) => {
  const header = Object.keys(artist).length > 0 ? <ArtistCityGuideComponent artist={artist} city={homeCity} /> : <CityGuideComponent city={homeCity} />;
  return <div id="main">
          {header}
          <CityMapComponent homeCity={homeCity} locations={locations} artist={artist} artistComments={artistComments} props={props} dispatch={dispatch}/>
         </div>;
}

export const CityComponent = ( {homeCity, locations, artist, artistComments, props, dispatch} ) =>
(
  <div>{getCity(homeCity, locations, artist, artistComments, props, dispatch)}</div>
);
