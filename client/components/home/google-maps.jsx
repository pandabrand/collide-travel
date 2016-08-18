import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import GoogleMap from 'google-map-react';
import MapMarkerComponent from '../mapping/map-marker.jsx';
import {K_CIRCLE_SIZE} from '../mapping/marker-style.js';
import {MapTableComponent} from '../mapping/map-table.jsx';
import setCircleHover from '../../../lib/client/actions/set-circle-hover.js';
import setMapLocationClick from '../../../lib/client/actions/set-map-location-click.js';
import setMapTableRowClick from '../../../lib/client/actions/set-map-table-row-click.js';


const MAP_KEY = Meteor.settings.public.GMAP_KEY;
const DEFAULT_ZOOM = 12;
const mapOptions = {
  scrollwheel: false,
};

const getCoordsByCity = (homeCity, locations, artist, artistComments, dispatch, props) => {

  _onChildClick = (key, childProps) => {
    // console.dir(childProps);
    return dispatch(setMapTableRowClick({item: childProps.item, coord: {lat: childProps.location.lat, lng: childProps.location.lng}}));
  }

  const places = locations
    .map((location,i) => {

      return (
        <MapMarkerComponent dispatch={dispatch} lat={location.lat} lng={location.lng} key={i} item={i.toString()} type={location.type} zIndex={i} mapTableHoverIndex={props.mapTableHover} mapTableRowClick={props.mapTableRowClick} mapLocationClick={props.mapLocationClick} location={location}/>
      );
    });

  if(homeCity && locations) {
    homeCenter = Object.keys(props.mapTableRowClick).length > 0 ? props.mapTableRowClick.coord : homeCity.location;
    return <div className="row artist-map-row map-container">
      <div className="col-md-6 col-sm-6 col-xs-12 map-table-col">
        <MapTableComponent dispatch={dispatch} markerCirlceHover={props.markerCirlceHover} locations={locations} artist={artist} artistComments={artistComments} />
      </div>
      <div className="col-md-6 col-sm-6 col-xs-12 artist-map">
        <GoogleMap
          bootstrapURLKeys={{key: MAP_KEY}}
          center={homeCenter}
          zoom={DEFAULT_ZOOM}
          hoverDistance={K_CIRCLE_SIZE}
          onChildMouseEnter={(event) => { return dispatch(setCircleHover(event))}}
          onChildMouseLeave={() => { return dispatch(setCircleHover(-1))}}
          options={mapOptions}
          onChildClick={_onChildClick}
          //onChildClick={(event) => {return dispatch(setMapTableRowClick({item: item, coord: {lat: location.lat, lng: location.lng}}))}}
          //onGoogleApiLoaded={({map, maps}) => { trafficLayerInit(map, maps); } }
          //  yesIWantToUseGoogleMapApiInternals
            >
          {places}
        </GoogleMap>
      </div>
      </div>;
  } else {
    return <div className="trending-loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
    </div>;
  }
}

export default GoogleMapsComponent = ( {homeCity, locations, artist, artistComments, dispatch, props} ) =>
(
  <div>{getCoordsByCity(homeCity, locations, artist, artistComments, dispatch, props)}</div>
);
