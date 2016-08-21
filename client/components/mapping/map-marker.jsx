import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {markerStyle, markerCircleStyle, markerCircleStyleHover, markerPointerStyle} from './marker-style.js';
import MapIconComponent from './map-icons.jsx';
import setMapTableRowClick from '../../../lib/client/actions/set-map-table-row-click.js';


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
    const {item, zIndex, mapTableHoverIndex, location, mapLocationClick, type, mapTableRowClick, dispatch, artists, comments} = this.props;
    const style = {...markerStyle, zIndex: this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) ? 1000 : zIndex};
    const circleStyle = this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) ? markerCircleStyleHover : markerPointerStyle;
    const popoverStyle = (mapTableRowClick && parseInt(mapTableRowClick.item) === parseInt(item)) ? {display:'block'} : {display:'none'};
    const imgFile = location.photo.substr(location.photo.lastIndexOf('/') + 1);
    const imgSrc = $.cloudinary.url( imgFile, {width:246, height:246, crop:"fill"});
    const mapLink = (location) => {
      return 'https://www.google.com/maps/dir/Current+Location/'+location.location.lat+','+location.location.lng;
    }

    const getArtistsWithLocation = (location, artists) => {
      const id = location._id;
      const artistsWithLocation = _.filter(artists, function(artist) {
        return _.contains(artist.locationIds, id);
      });
      return artistsWithLocation;
    }

    const pinColorStyle = {backgroundColor: getArtistsWithLocation(location, artists).length === 1 ?  getArtistsWithLocation(location, artists)[0].color : '#d93687'};

    const pinCssClassName = getArtistsWithLocation(location, artists).length > 1 ? 'pin-rainbow' : 'pin';

    const getArtistForComment = (artistId) => {
      return _.findWhere(artists, {_id:artistId});
    }

    return (
        <div style={style}>
          <div className={pinCssClassName} style={pinColorStyle}>
          </div>
          <div className="pulse"></div>
          <div id={'mapPopover'+item} className="popover popover-default location-popover" style={popoverStyle}>
            <h3 className="popover-title title">{location.name}</h3><button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { return  dispatch(setMapTableRowClick({item: '-1', coord: {}}))}}><span aria-hidden="true">&times;</span></button>
            <div className="popover-content">
              <div className="address">{location.addressNumber} {location.addressStreet}</div>
              {comments.map((comment, i) => {
                const _a = getArtistForComment(comment.artistId);
                return comment && !comment.hideComment && comment.comment && comment.comment.length > 0 && comment.comment !== 'undefined' ? <div key={i} style={{boxShadow: '1px 1px 2px 0 '+ _a.color}} className="pin-artist-comment">
                          <div className="pin-artist">{_a.artistName}</div>
                          <div className="pin-comment">{comment.comment}</div>
                        </div> : '';
              })}
              <div className="links"><a href={mapLink(location)} target="_blank">Directions <i className="fa fa-map-o"></i></a></div>
            </div>
          </div>
        </div>
    );
  }
}
