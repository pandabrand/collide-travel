import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import GoogleMap from 'google-map-react';
import classnames from 'classnames';

import MapMarkerComponent from '../mapping/map-marker.jsx';
import {K_CIRCLE_SIZE} from '../mapping/marker-style.js';
import {MapTableComponent} from '../mapping/map-table.jsx';
import setCircleHover from '../../../lib/client/actions/set-circle-hover.js';
import setMapLocationClick from '../../../lib/client/actions/set-map-location-click.js';
import setMapTableRowClick from '../../../lib/client/actions/set-map-table-row-click.js';

const MAP_KEY = Meteor.settings.public.GMAP_KEY;
const DEFAULT_ZOOM = 14;
const mapOptions = {
  scrollwheel: false,
};

const getCityMap = (city, locations, artists, artistComments, dispatch, props) => {

  let bounds = [];

  const places = locations
    .map((location,i) => {
      const commentsForLocation = _.where(artistComments, {locationId: location._id});

      return (
        <MapMarkerComponent dispatch={dispatch} artists={artists} comments={commentsForLocation} {...location.location} key={i} item={i.toString()} type={location.type} zIndex={i} mapTableHoverIndex={props.mapTableHover} mapTableRowClick={props.mapTableRowClick} mapLocationClick={props.mapLocationClick} location={location}/>
      );
    });

  _onChildClick = (key, childProps) => {
    return dispatch(setMapTableRowClick({item: childProps.item, coord: childProps.location.location}));
  }

  const bounding = (map) => {
    const bound = new google.maps.LatLngBounds();

    const bounds = locations.map((location, i) =>{
      bound.extend(new google.maps.LatLng({lat:location.location.lat, lng:location.location.lng}));
    });

    map.fitBounds(bound);
  }

  let fixedMapClass = classnames('col-md-6 col-sm-6 col-md-push-6 col-sm-push-6 col-xs-12 city-map-col', {'fix-map': props.mapPosition});

  if(city && locations) {
    homeCenter = locations[0].location;
    return <div className={fixedMapClass}>
      <div id='artists-city-map-component' className="city-map">
        <GoogleMap
          bootstrapURLKeys={{key: MAP_KEY}}
          center={homeCenter}
          zoom={DEFAULT_ZOOM}
          //hoverDistance={K_CIRCLE_SIZE}
          onChildMouseEnter={(event) => { return dispatch(setCircleHover(event))}}
          onChildMouseLeave={() => { return dispatch(setCircleHover(-1))}}
          options={mapOptions}
          onChildClick={_onChildClick}
          //onGoogleApiLoaded={({map, maps}) => { bounding(map) } }
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

export default CityMapsComponent = ( {city, locations, artists, artistComments, dispatch, props} ) =>
(
  <div>{getCityMap(city, locations, artists, artistComments, dispatch, props)}</div>
);
