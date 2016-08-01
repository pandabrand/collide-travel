import React from 'react';

import CityGuide from './city-guide.jsx';
import CityMap from '../home/google-maps.jsx';

const getCity = (homeCity, locations, props, dispatch) => {
  return <div id="main">
          <CityGuide city={homeCity} />
          <CityMap homeCity={homeCity} locations={locations} props={props} dispatch={dispatch}/>
         </div>;
}

export const City = ( {homeCity, locations, props, dispatch} ) =>
(
  <div>{getCity(homeCity, locations, props, dispatch)}</div>
);
