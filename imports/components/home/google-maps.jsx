import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import Waypoint from 'react-waypoint';
import GoogleMap from 'google-map-react';
import classnames from 'classnames';

import MapMarkerComponent from '/imports/components/mapping/map-marker.jsx';
import {K_CIRCLE_SIZE} from '/imports/components/mapping/marker-style.js';
import {MapTableComponent} from '/imports/components/mapping/map-table.jsx';
import setCircleHover from '/lib/actions/set-circle-hover.js';
import setMapLocationClick from '/lib/actions/set-map-location-click.js';
import setMapTableRowClick from '/lib/actions/set-map-table-row-click.js';
import setMapPosition from '/lib/actions/set-map-position.js';

const MAP_KEY = Meteor.settings.public.GMAP_KEY;
const DEFAULT_ZOOM = 14;
const mapOptions = {
  scrollwheel: false,
};

const getCoordsByCity = (homeCity, locations, artist, artists, artistComments, dispatch, props) => {

  const markerArtists = artist ? [artist] : artists;

  _onChildClick = (key, childProps) => {
    return dispatch(setMapTableRowClick({item: childProps.item, coord: {lat: childProps.location.lat, lng: childProps.location.lng}}));
  }

  const bounding = (map) => {
    const bound = new google.maps.LatLngBounds();

    const bounds = locations.map((location, i) =>{
      bound.extend(new google.maps.LatLng({lat:location.location.lat, lng:location.location.lng}));
    });

    map.fitBounds(bound);
  }

  const places = locations
    .map((location,i) => {
      const commentsForLocation = _.where(artistComments, {locationId: location._id});

      return (
        <MapMarkerComponent dispatch={dispatch} artists={markerArtists} comments={commentsForLocation} {...location.location} key={i} item={i.toString()} type={location.type} zIndex={i} mapTableHoverIndex={props.mapTableHover} mapTableRowClick={props.mapTableRowClick} mapLocationClick={props.mapLocationClick} location={location}/>
      );
    });

    const _onWaypointEnter = (currentPosition) => {
      if(window.matchMedia('(max-width: 511px)').matches && currentPosition.currentPosition === 'inside') {
        return dispatch(setMapPosition(false));
      }
    }

    const _onWaypointLeave = (currentPosition) => {
      if(window.matchMedia('(max-width: 511px)').matches && currentPosition.currentPosition === 'above') {
        return dispatch(setMapPosition(currentPosition.currentPosition === 'above'));
      }
    }

    const _onWaypointPositionChange = (currentPosition) => {
    }

  let fixedMapClass = classnames('col-md-6 col-sm-6 col-md-push-6 col-sm-push-6 col-xs-12 featured-map-col', {'fix-map': props.mapPosition});
  let tableMapClass = classnames('col-md-6 col-sm-6 col-md-pull-6 col-sm-pull-6 col-xs-12 featured-table-col', {'mobile-map-table' : props.mapPosition});

  if(homeCity && locations) {
    homeCenter = (typeof window !== 'undefined' && window.innerWidth <= 768 && props.mobileMapRowPosition && Object.keys(props.mobileMapRowPosition).length > 0 && props.mobileMapRowPosition !== '-1') ? props.mobileMapRowPosition : Object.keys(props.mapTableRowClick).length > 0 ? props.mapTableRowClick.coord : locations[0].location;
    _window = typeof window !== 'undefined' ? window : {};
    return <div className="row featured-city soundcloud-border">
      <Waypoint scrollableAncestor={_window} onEnter={_onWaypointEnter} onLeave={_onWaypointLeave} onPositionChange={_onWaypointPositionChange} fireOnRapidScroll={true} topOffset='40px'/>
      <div className={fixedMapClass}>
        <div className="featured-map">
          <GoogleMap
            bootstrapURLKeys={{key: MAP_KEY}}
            center={homeCenter}
            zoom={DEFAULT_ZOOM}
            hoverDistance={K_CIRCLE_SIZE}
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
      </div>
      <div className={tableMapClass}>
        <MapTableComponent dispatch={dispatch} markerCirlceHover={props.markerCirlceHover} locations={locations} artist={artist} artists={markerArtists} artistComments={artistComments} />
      </div>
      </div>;
  } else {
    return <div className="trending-loading"><i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
    </div>;
  }
}

export default GoogleMapsComponent = ( {homeCity, locations, artist, artists, artistComments, dispatch, props} ) =>
(
  <div>{getCoordsByCity(homeCity, locations, artist, artists, artistComments, dispatch, props)}</div>
);
