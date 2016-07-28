import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { Cities } from '../../../lib/collections/cities.js';
import { Locations } from '../../../lib/collections/locations.js';

import GoogleMap from 'google-map-react';
import MapMarker from '../mapping/map-marker.jsx';
import {K_CIRCLE_SIZE} from '../mapping/marker-style.js';
import {MapTable} from '../mapping/map-table.jsx';
import setCircleHover from '../../../lib/client/actions/set-circle-hover.js';
import Spinner from 'react-spinkit';


const MAP_KEY = Meteor.settings.public.GMAP_KEY;
const DEFAULT_ZOOM = 12;
const mapOptions = {
  scrollwheel: false,
};

const getCoordsByCity = (homeCity, locations, dispatch, props) => {
  const trafficLayerInit = (map, maps) => {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }
  if(homeCity && locations) {
    homeCenter = Object.keys(props.mapTableRowClick).length > 0 ? props.mapTableRowClick : {lat: homeCity.lat, lng: homeCity.lng};
    return <div className="map-container">
      <div className="table-container">
        <MapTable dispatch={dispatch} markerCirlceHover={props.markerCirlceHover} locations={locations} />
      </div>
      <div className="map-layout">
        <GoogleMap
          bootstrapURLKeys={{key: MAP_KEY}}
          center={homeCenter}
          zoom={DEFAULT_ZOOM}
          hoverDistance={K_CIRCLE_SIZE}
          onChildMouseEnter={(event) => { return dispatch(setCircleHover(event))}}
          onChildMouseLeave={() => { return dispatch(setCircleHover(-1))}}
          options={mapOptions}
          onChildClick={(event) => {return(console.log(JSON.stringify(event)))}}
          onGoogleApiLoaded={({map, maps}) => { trafficLayerInit(map, maps); } }
            yesIWantToUseGoogleMapApiInternals>
          {locations.map(function(location,i){
              return <MapMarker lat={location.lat} lng={location.lng} key={i} item={(i+1).toString()} zIndex={i} mapTableHoverIndex={props.mapTableHover}/>
            })
          }
        </GoogleMap>
      </div>
    </div>;
  } else {
    return <Spinner spinnerName='cube-grid'/>;
  }
}

export const HomeCity = ( {homeCity, locations, dispatch, props} ) =>
(
  <div>{getCoordsByCity(homeCity, locations, dispatch, props)}</div>
);
