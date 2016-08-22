import React from 'react';
import ReactDOM from 'react-dom';

import CityGuideComponent from './city-guide.jsx';
import ArtistCityGuideComponent from './artist-city-guide.jsx';
import CityMapsComponent from './city-map.jsx';
import CityArtistsTableComponent from './city-artists-table.jsx';

const getCity = (homeCity, locations, artists, artistComments, props, dispatch) => {
  _onChildScroll = (key, childProps) => {
    console.dir(key);
    console.dir(childProps);
  }

  return <div id="main" className="container">
          <CityGuideComponent city={homeCity} />
          {/*<CityMapComponent homeCity={homeCity} locations={locations} artist={artist} artistComments={artistComments} props={props} dispatch={dispatch}/>*/}
          <div className="fluid-container map-border">
            <div className="row city-wrapper featured-city">
              <CityMapsComponent key="artists-city-map-component" dispatch={dispatch} props={props} city={homeCity} locations={locations} artists={artists} artistComments={artistComments}/>
              <CityArtistsTableComponent city={homeCity} artists={artists}/>
              <div className="get-clear"></div>
            </div>
         </div>
         </div>;
}

export const CityComponent = ( {homeCity, locations, artists, artistComments, props, dispatch} ) =>
(
  <div>{getCity(homeCity, locations, artists, artistComments, props, dispatch)}</div>
);
