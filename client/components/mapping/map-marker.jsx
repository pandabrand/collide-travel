import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {markerStyle, markerCircleStyle, markerCircleStyleHover} from './marker-style.js';


export default class MapMarker extends Component {
  static propTypes = {
    $hover: PropTypes.bool,
    item: PropTypes.string,
    zIndex: PropTypes.number
  };

  static defaultProps = {};
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseOver() {
    this.setState({isHovering: true});
    console.log('isHovering: ' + this.state.isHovering);
  }

  handleMouseOut() {
    this.setState({isHovering: false});
    console.log('isHovering: ' + this.state.isHovering);
  }

  render() {
    const {item, zIndex, mapTableHoverIndex} = this.props;

    const style = {...markerStyle, zIndex: this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) ? 1000 : zIndex};
    const circleStyle = this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) ? markerCircleStyleHover : markerCircleStyle;

    return (
      <div style={style}>
        <div style={circleStyle}>
           {item}
        </div>
      </div>
    );
  }
}
