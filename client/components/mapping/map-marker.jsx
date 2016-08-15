import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {markerStyle, markerCircleStyle, markerCircleStyleHover, markerPointerStyle} from './marker-style.js';
import MapIconComponent from './map-icons.jsx';


export default class MapMarkerComponent extends Component {
  static propTypes = {
    $hover: PropTypes.bool,
    item: PropTypes.string,
    zIndex: PropTypes.number,
    location: PropTypes.object,
  };

  static defaultProps = {
  };
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const {item, zIndex, mapTableHoverIndex, location, mapLocationClick, type} = this.props;
    const style = {...markerStyle, zIndex: this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) ? 1000 : zIndex};
    const circleStyle = this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) ? markerCircleStyleHover : markerPointerStyle;
    const popoverStyle = (parseInt(mapLocationClick)+1) === parseInt(item) ? {display:'block'} : {display:'none'};
    const imgFile = location.photo.substr(location.photo.lastIndexOf('/') + 1);
    const imgSrc = $.cloudinary.url( imgFile, {width:246, height:246, crop:"fill"});
    const mapLink = (location) => {
      return 'https://www.google.com/maps/dir/Current+Location/'+location.location.lat+','+location.location.lng;
    }

    return (
      <div>
        <div style={style}>
          <div className="pin" data-toggle="popover" data-placement="bottom">
          </div>
        </div>
        <div className="pulse"></div>
        <div id={'mapPopover'+item} className="popover popover-default location-popover" style={popoverStyle}>
          <h3 className="popover-title title">{location.name}</h3>
          <div className="popover-content">
            <div className="address">{location.addressNumber} {location.addressStreet}</div>
            <div className="photo"><img src={imgSrc}/></div>
            <div className="links"><a href={mapLink(location)} target="_blank">Directions <i className="fa fa-map-o"></i></a></div>
          </div>
        </div>
      </div>
    );
  }
}
