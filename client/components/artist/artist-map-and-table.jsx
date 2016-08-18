import React from 'react';
import { connect } from 'react-redux';

import {MapTableComponent} from '../mapping/map-table.jsx';
import GoogleMapsComponent from '../home/google-maps.jsx';

export default ArtistMapAndTableComponent = ({artist, homeCity, locations, artistComments, props, dispatch}) => {
  return (<div className="fluid-container artist-map-container">
          <GoogleMapsComponent homeCity={homeCity} locations={locations} artist={artist} artistComments={artistComments} dispatch={dispatch} props={props}/>
        </div>);
};
