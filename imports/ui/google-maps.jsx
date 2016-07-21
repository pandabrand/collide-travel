import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import MapMarker from './mapping/map-marker.jsx';
import MapTable from './mapping/map-table.jsx';

const MAP_KEY = Meteor.settings.public.GMAP_KEY;

export default class HomeMap extends Component {

  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    mapPlaceCoords: PropTypes.any
  };

  static defaultProps = {
    center: [41.928432, -87.707342],
    zoom: 12,
    greatPlaces: [
     {id: 'A', lat: 41.927665, lng: -87.706945},
     {id: 'B', lat: 41.923945, lng: -87.699295}
    ]
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="map-container">
        <div className="table-container">
          <MapTable/>
        </div>
        <div className="map-layout">
          <GoogleMap
            bootstrapURLKeys={{key: MAP_KEY}}
            center={this.props.center}
            zoom={this.props.zoom}>
              <MapMarker lat={41.927665} lng={-87.706945} text={'A'} />
              <MapMarker lat={41.923945} lng={-87.699295} text={'B'} />
          </GoogleMap>
        </div>
      </div>
    );
  }
}
