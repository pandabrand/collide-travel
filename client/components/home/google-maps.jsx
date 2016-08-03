import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import GoogleMap from 'google-map-react';
import MapMarkerComponent from '../mapping/map-marker.jsx';
import {K_CIRCLE_SIZE} from '../mapping/marker-style.js';
import {MapTableComponent} from '../mapping/map-table.jsx';
import setCircleHover from '../../../lib/client/actions/set-circle-hover.js';
import Spinner from 'react-spinkit';


const MAP_KEY = Meteor.settings.public.GMAP_KEY;
const DEFAULT_ZOOM = 12;
const mapOptions = {
  scrollwheel: false,
};

const getCoordsByCity = (homeCity, locations, artist, artistComments, dispatch, props) => {
  const trafficLayerInit = (map, maps) => {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }
  if(homeCity && locations) {
    homeCenter = Object.keys(props.mapTableRowClick).length > 0 ? props.mapTableRowClick : {lat: homeCity.lat, lng: homeCity.lng};
    return <div className="map-container">
      <div className="table-container">
        <MapTableComponent dispatch={dispatch} markerCirlceHover={props.markerCirlceHover} locations={locations} artist={artist} artistComments={artistComments} />
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
              return <MapMarkerComponent lat={location.lat} lng={location.lng} key={i} item={(i+1).toString()} type={location.type} zIndex={i} mapTableHoverIndex={props.mapTableHover}/>
            })
          }
        </GoogleMap>
      </div>
    </div>;
  } else {
    return <Spinner spinnerName='cube-grid'/>;
  }
}

export default GoogleMapsComponent = ( {homeCity, locations, artist, artistComments, dispatch, props} ) =>
(
  <div>{getCoordsByCity(homeCity, locations, artist, artistComments, dispatch, props)}</div>
);
