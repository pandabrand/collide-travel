import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { createContainer } from 'meteor/react-meteor-data';

import { Cities } from '../../../lib/collections/cities.js';

import GoogleMap from 'google-map-react';
import MapMarker from '../mapping/map-marker.jsx';
import MapTable from '../mapping/map-table.jsx';

import Spinner from '../includes/spinner.jsx'
import Loading from 'react-loading-spinner';
import 'react-loading-spinner/src/css/index.css';


const MAP_KEY = Meteor.settings.public.GMAP_KEY;

export default class HomeMap extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    mapPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [34.052234, -118.243685],
    zoom: 12,
    greatPlaces: [
     {id: 'A', lat: 41.927665, lng: -87.706945},
     {id: 'B', lat: 41.923945, lng: -87.699295}
    ]
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {pos: null};
  }

  getCoordsByGeolocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.setState({pos: {lat: position.coords.latitude, lng: position.coords.longitude}});
      }.bind(this));
    }
  }

  getCoordsByCity() {
    let cities = this.props.cities;
    console.log('# of cities: ' + cities.length);
    if(cities.length !== 0) {
      this.setState({pos: {lat: cities[0].lat, lng: cities[0].lng}}).bind(this);
    }
  }

  componentWillMount() {
    //this.getCoordsByGeolocation();
    this.getCoordsByCity();
  }

  render() {
    let mapContent;
    if(this.state.pos !== null) {
      mapContent = <div className="map-container">
      <div className="table-container">
        <MapTable/>
      </div>
      <div className="map-layout">
        <GoogleMap
          bootstrapURLKeys={{key: MAP_KEY}}
          center={Object.keys(this.state.pos).length !== 0 ? this.state.pos : this.props.center}
          zoom={this.props.zoom}>
            <MapMarker lat={41.927665} lng={-87.706945} text={'A'} />
            <MapMarker lat={41.923945} lng={-87.699295} text={'B'} />
        </GoogleMap>
      </div>
      </div>;
    } else {
      mapContent = <Loading isLoading={this.state.pos === null} loadingClassName='loading' />;
    }
    return (
      <div>{mapContent}</div>
    );
  }
}

HomeMap.PropTypes = {
  cities: PropTypes.array.isRequired,
}

export default createContainer(() => {
  Meteor.subscribe('Cities');

  return {
    cities: Cities.find({}, { sort: {default: true} }).fetch(),
  };
}, HomeMap);
