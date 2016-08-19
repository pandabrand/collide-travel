import React from 'react';

import CategoryGuideComponent from './category-guide.jsx';
import CityMapComponent from '../home/google-maps.jsx';

const getCategory = (homeCity, locations, artists, artistComments,  props, dispatch) => {

  return <div id="main">
          <CategoryGuideComponent category={props.type} />
          <CityMapComponent homeCity={homeCity} locations={locations} props={props} dispatch={dispatch}/>
         </div>;
}

export const CategoryComponent = ( {homeCity, locations, artists, artistComments, props, dispatch} ) =>
(
  <div>{getCategory(homeCity, locations, artists, artistComments, props, dispatch)}</div>
);
