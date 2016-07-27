import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { Cities } from '../../../lib/collections/cities.js';
import { Locations } from '../../../lib/collections/locations.js';

import GoogleMap from 'google-map-react';
import MapMarker from '../mapping/map-marker.jsx';
import {K_CIRCLE_SIZE} from '../mapping/marker-style.js';
import {MapTable} from '../mapping/map-table.jsx';

import Spinner from '../includes/spinner.jsx'
import Loading from 'react-loading-spinner';
import 'react-loading-spinner/src/css/index.css';


const MAP_KEY = Meteor.settings.public.GMAP_KEY;
const DEFAULT_ZOOM = 12;

const getCoordsByCity = (homeCity, locations) => {
  const handleMouseOver = (event) => {
    console.log('event: ' + event);
  }

  if(homeCity && locations) {
    const homeCenter = {lat: homeCity.lat, lng: homeCity.lng};
    return <div className="map-container">
      <div className="table-container">
        <MapTable locations={locations}/>
      </div>
      <div className="map-layout">
        <GoogleMap
          bootstrapURLKeys={{key: MAP_KEY}}
          center={homeCenter}
          zoom={DEFAULT_ZOOM}
          hoverDistance={K_CIRCLE_SIZE}
          onChildMouseEnter={handleMouseOver}>
          {locations.map(function(location,i){
              return <MapMarker lat={location.lat} lng={location.lng} key={i} item={(i+1).toString()} zIndex={i+1} />
            })
          }
        </GoogleMap>
      </div>
    </div>;
  } else {
    return <div className='loading' >trying to load</div>;
  }
}

export const HomeCity = ( {homeCity, locations} ) =>
(
  <div>{getCoordsByCity(homeCity, locations)}</div>
);
