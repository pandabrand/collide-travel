import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import MapMarker from './mapping/map-marker.jsx';


export default class HomeMap extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    mapPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 8,
    mapPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="map-container">
        <GoogleMap
          key={process.env.GOOGLE_MAP_KEY}
          center={this.props.center}
          zoom={this.props.zoom}>
            <MapMarker lat={59.955413} lng={30.337844} text={'A'} />
            <MapMarker {...this.props.mapPlaceCoords} text={'B'} />
        </GoogleMap>
      </div>
    );
  }
}
