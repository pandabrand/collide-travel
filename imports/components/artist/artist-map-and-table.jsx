import React from 'react';
import { connect } from 'react-redux';

import {MapTableComponent} from '/imports/components/mapping/map-table.jsx';
import GoogleMapsComponent from '/imports/components/home/google-maps.jsx';

export default ArtistMapAndTableComponent = ({artist, homeCity, locations, artistComments, props, dispatch}) => {
  return (<div className="fluid-container map-border">
          <GoogleMapsComponent homeCity={homeCity} locations={locations} artist={artist} artistComments={artistComments} dispatch={dispatch} props={props}/>
        </div>);
};
