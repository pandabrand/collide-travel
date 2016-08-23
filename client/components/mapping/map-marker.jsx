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
    const style = {...markerStyle, zIndex: this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) || (mapTableRowClick && parseInt(mapTableRowClick.item) === parseInt(item)) ? 1000 : zIndex};
    const circleStyle = this.props.$hover || (parseInt(mapTableHoverIndex)+1) === parseInt(item) ? markerCircleStyleHover : markerPointerStyle;
    const popoverStyle = (mapTableRowClick && parseInt(mapTableRowClick.item) === parseInt(item)) ? {display:'block'} : {display:'none'};
    const imgFile = location.photo.substr(location.photo.lastIndexOf('/') + 1);
    const imgSrc = $.cloudinary.url( imgFile, {width:246, height:246, crop:"fill"});
    const mapLink = (location) => {
      return 'https://www.google.com/maps/dir/Current+Location/'+location.location.lat+','+location.location.lng;
    }

    const twitterLink = (location, _a, comment) => {
      const path = FlowRouter.path('artist-guide', {name:_a.cityName, artistName:_a.artistSlug});
      const url = Meteor.absoluteUrl(path);
      return 'https://twitter.com/intent/tweet?text='+_a.artistName + ' on ' + location.name + ' and more at Travel Collide.&url='+url;
    }

    const facebookLink = (location, _a, comment) => {
      const path = 'https://www.facebook.com/sharer/sharer.php?u=';
      const frpath = FlowRouter.path('artist-guide', {name:_a.cityName, artistName:_a.artistSlug});
      const url = Meteor.absoluteUrl(frpath);
      return path + url;
    }

    const pinterestLink = (location, _a, comment) => {
      const path = 'https://www.pinterest.com/pin/create/button/?url=';
      const frpath = FlowRouter.path('artist-guide', {name:_a.cityName, artistName:_a.artistSlug});
      const media = '&media=' + imgSrc;
      const description = '&description='+_a.artistName + ' on ' + location.name + ' and more at Travel Collide.';
      return path + frpath + media + description;
    }

    const tumblrLink = (location, _a, comment) => {
      const path = 'http://tumblr.com/widgets/share/tool?canonicalUrl=';
      const frpath = FlowRouter.path('artist-guide', {name:_a.cityName, artistName:_a.artistSlug});
      const title = '&title=' + _a.artistName + ' on ' + location.name;
      const content = '&content=' + comment.comment;
      return path + frpath + title + content;
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
                          <div className="popover-social-icons">
                            <a href={twitterLink(location, _a, comment)} target="_blank" className="external"><i className="fa fa-twitter"></i></a>
                            <a href={facebookLink(location, _a, comment)} target="_blank" className="external"><i className="fa fa-facebook"></i></a>
                            {/*<a href="http://instagram.com/officialculturecollide" target="_blank" className="external"><i className="fa fa-instagram"></i></a>*/}
                            <a href={pinterestLink(location, _a, comment)} data-pin-do="buttonPin" target="_blank" className="external"><i className="fa fa-pinterest"></i></a>
                            <a href={tumblrLink(location, _a, comment)} target="_blank" className="external"><i className="fa fa-tumblr"></i></a>
                          </div>
                        </div> : <div key={i} style={{boxShadow: '1px 1px 2px 0 '+ _a.color}} className="pin-artist-comment"><a className="artist-comment-link" href={FlowRouter.path('artist-guide', {name:artist.cityName, artistName:artist.artistSlug})}><div className="pin-artist">{_a.artistName} Recommendation</div></a></div>;
              })}
              <div className="map-links"><a href={mapLink(location)} target="_blank">Directions <i className="fa fa-map-o"></i></a></div>
              <div className="map-links"><a className="location-website" href={location.website} target="_blank">Website <i className="fa fa-laptop"></i></a></div>
            </div>
          </div>
        </div>
    );
  }
}
