import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import GoogleMap from 'google-map-react';
import MapMarkerComponent from '../mapping/map-marker.jsx';
import {K_CIRCLE_SIZE} from '../mapping/marker-style.js';
import {MapTableComponent} from '../mapping/map-table.jsx';
import setCircleHover from '../../../lib/client/actions/set-circle-hover.js';
import setMapLocationClick from '../../../lib/client/actions/set-map-location-click.js';


const MAP_KEY = Meteor.settings.public.GMAP_KEY;
const DEFAULT_ZOOM = 12;
const mapOptions = {
  scrollwheel: false,
};

const getCityMap = (city, locations, dispatch, props) => {
  // const trafficLayerInit = (map, maps) => {
  //   var trafficLayer = new google.maps.TrafficLayer();
  //   trafficLayer.setMap(map);
  // }
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
          onChildClick={(event) => {return dispatch(setMapLocationClick(event))}}
          //onGoogleApiLoaded={({map, maps}) => { trafficLayerInit(map, maps); } }
          //  yesIWantToUseGoogleMapApiInternals
            >
          {locations.map(function(location,i){
              return <MapMarkerComponent lat={location.lat} lng={location.lng} key={i} item={(i+1).toString()} type={location.type} zIndex={i} location={location} mapLocationClick={props.mapLocationClick}/>
            })
          }
        </GoogleMap>
      </div>;
  } else {
    return <div className="trending-loading"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
    </div>;
  }
}

export default CityMapsComponent = ( {city, locations, dispatch, props} ) =>
(
  <div className="col-sm-6 col-xs-12 city-map-column">{getCityMap(city, locations, dispatch, props)}</div>
);
