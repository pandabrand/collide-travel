import React from 'react';

import CategoryGuideComponent from './category-guide.jsx';
import CityMapComponent from '../home/google-maps.jsx';

const getCategory = (homeCity, locations, artists, artistComments,  props, dispatch) => {

  return <div id="main">
          <CategoryGuideComponent category={props.type} />
          <div className="map-border">
            <CityMapComponent homeCity={homeCity} locations={locations} artists={artists} artistComments={artistComments} props={props} dispatch={dispatch}/>
          </div>
         </div>;
}

export const CategoryComponent = ( {homeCity, locations, artists, artistComments, props, dispatch} ) =>
(
  <div>{getCategory(homeCity, locations, artists, artistComments, props, dispatch)}</div>
);
