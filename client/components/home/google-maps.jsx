import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { Cities } from '../../../lib/collections/cities.js';

import GoogleMap from 'google-map-react';
import MapMarker from '../mapping/map-marker.jsx';
import MapTable from '../mapping/map-table.jsx';

import Spinner from '../includes/spinner.jsx'
import Loading from 'react-loading-spinner';
import 'react-loading-spinner/src/css/index.css';


const MAP_KEY = Meteor.settings.public.GMAP_KEY;
const DEFAULT_ZOOM = 12;

const getCoordsByCity = (homeCity) => {
  if(homeCity) {
    const homeCenter = {lat: homeCity.lat, lng: homeCity.lng};
    return <div className="map-container">
      <div className="table-container">
        <MapTable/>
      </div>
      <div className="map-layout">
        <GoogleMap
          bootstrapURLKeys={{key: MAP_KEY}}
          center={homeCenter}
          zoom={DEFAULT_ZOOM}>
            <MapMarker lat={41.927665} lng={-87.706945} text={'A'} />
            <MapMarker lat={41.923945} lng={-87.699295} text={'B'} />
        </GoogleMap>
      </div>
    </div>;
  } else {
    return <div className='loading' >trying to load</div>;
  }
}

export const HomeCity = ( {homeCity} ) =>
(
  <div>{getCoordsByCity(homeCity)}</div>
);
