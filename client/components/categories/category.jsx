import React from 'react';

import CategoryGuide from './category-guide.jsx';
import CityMap from '../home/google-maps.jsx';

const getCategory = (homeCity, locations, props, dispatch) => {

  return <div id="main">
          <CategoryGuide category={props.type} />
          <CityMap homeCity={homeCity} locations={locations} props={props} dispatch={dispatch}/>
         </div>;
}

export const Category = ( {homeCity, locations, props, dispatch} ) =>
(
  <div>{getCategory(homeCity, locations, props, dispatch)}</div>
);
