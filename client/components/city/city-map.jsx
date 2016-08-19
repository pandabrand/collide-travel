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

const getCityMap = (city, locations, artists, artistComments, dispatch, props) => {
  _onChildClick = (key, childProps) => {
    // console.dir(childProps);
    return dispatch(setMapTableRowClick({item: childProps.item, coord: {lat: childProps.location.lat, lng: childProps.location.lng}}));
  }

  const places = locations
    .map((location,i) => {
      const commentsForLocation = _.where(artistComments, {locationId: location._id});

      return (
        <MapMarkerComponent artists={artists} comments={commentsForLocation} dispatch={dispatch} lat={location.lat} lng={location.lng} key={i} item={i.toString()} type={location.type} zIndex={i} mapTableHoverIndex={props.mapTableHover} mapTableRowClick={props.mapTableRowClick} mapLocationClick={props.mapLocationClick} location={location}/>
      );
    });

  if(city && locations) {
    homeCenter = city.location;
    return <div className="map">
        <GoogleMap
          bootstrapURLKeys={{key: MAP_KEY}}
          center={homeCenter}
          zoom={DEFAULT_ZOOM}
          //hoverDistance={K_CIRCLE_SIZE}
          onChildMouseEnter={(event) => { return dispatch(setCircleHover(event))}}
          onChildMouseLeave={() => { return dispatch(setCircleHover(-1))}}
          options={mapOptions}
          onChildClick={_onChildClick}
          //onGoogleApiLoaded={({map, maps}) => { trafficLayerInit(map, maps); } }
          //  yesIWantToUseGoogleMapApiInternals
            >
          {places}
        </GoogleMap>
      </div>;
  } else {
    return <div className="trending-loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
    </div>;
  }
}

export default CityMapsComponent = ( {city, locations, artists, artistComments, dispatch, props} ) =>
(
  <div className="col-sm-6 col-xs-12 city-map-column">{getCityMap(city, locations, artists, artistComments, dispatch, props)}</div>
);
