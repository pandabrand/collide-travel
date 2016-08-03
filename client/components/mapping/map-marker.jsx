import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {markerStyle, markerCircleStyle, markerCircleStyleHover} from './marker-style.js';
import MapIconComponent from './map-icons.jsx';


export default class MapMarkerComponent extends Component {
  static propTypes = {
    $hover: PropTypes.bool,
    item: PropTypes.string,
    zIndex: PropTypes.number
  };

  static defaultProps = {};
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const {item, zIndex, mapTableHoverIndex, type} = this.props;

    const style = {...markerStyle, zIndex: this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) ? 1000 : zIndex};
    const circleStyle = this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) ? markerCircleStyleHover : markerCircleStyle;

    return (
      <div style={style}>
        <div style={circleStyle}>
           <MapIconComponent type={type}/>
        </div>
      </div>
    );
  }
}
