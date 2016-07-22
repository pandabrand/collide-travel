import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import MapMarker from './mapping/map-marker.jsx';
import MapTable from './mapping/map-table.jsx';

import Spinner from './app/spinner.jsx'
import Loading from 'react-loading-spinner';
import 'react-loading-spinner/src/css/index.css';


const MAP_KEY = Meteor.settings.public.GMAP_KEY;
let pos = {};

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
    Meteor.call('getCoordsByCityGeolocation', 'Chicago IL', function(error, result) {
      if(error)
        console.log('there is an error ' + error.reason);

      console.log(JSON.stringify(result));
      this.setState({pos: {lat: result[0].latitude, lng: result[0].longitude}});
    }.bind(this));
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
