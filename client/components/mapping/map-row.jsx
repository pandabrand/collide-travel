import React from 'react';
import ReactDOM from 'react-dom';
import {markerTableCircleStyle,markerTableCircleStyleHover} from './marker-style.js';
import setMapTableHover from '../../../lib/client/actions/set-map-table-hover.js';
import setMapTableRowClick from '../../../lib/client/actions/set-map-table-row-click.js';
import MapIconComponent from './map-icons.jsx';
import store from '../../../lib/client/store/store.js';
import {createMarkup} from '../../lib/utils.js';

export default function MapRowComponent({location, item, hoverIndex, artists, comment, dispatch}){
  const handleScroll = () => {
    document.getElementById(location._id).scrollIntoView();
  };

  store.subscribe(() => {
    let state = store.getState()
    if(item === parseInt(state.markerCirlceHover)) {
      // handleScroll()
    }
  })

  const addComment = () => {
    if(comment && comment[0] && comment[0].comment.length > 0) {
      const _a = _.findWhere(artists, {_id:comment[0].artistId});
      return <div style={{boxShadow: '1px 1px 2px 0 '+ _a.color}} className="artist-comments"><div className="artist-comments-header">{_a.artistName} says: </div><div className="artist-comments-body">{comment[0].comment}</div></div>;
    } else {
      return '';
    }
  }

  const mapLink = (location) => {
    return 'https://www.google.com/maps/dir/Current+Location/'+location.location.lat+','+location.location.lng;
  }

  const imgFile = location.photo.substr(location.photo.lastIndexOf('/') + 1);
  const imgSrc = $.cloudinary.url( imgFile, {width:150, height:150, crop:"fill"});

  return (
    <tr id={location._id} onClick={() => {return dispatch(setMapTableRowClick({item: item, coord: {lat: location.lat, lng: location.lng}}))}} onMouseOver={() => {return dispatch(setMapTableHover(item))}} onMouseOut={() => {return dispatch(setMapTableHover(-1))}}>
      <td><div className="map-photo"><img src={imgSrc}/></div></td>
      <td>
        <div className="name-item">
          {/*<div style={item === parseInt(hoverIndex) ? markerTableCircleStyleHover : markerTableCircleStyle}><MapIconComponent type={location.type}/></div>*/}
          <div className="table-map-location-name">{location.name}</div>
        </div>
        {addComment()}
        <p className="front-map-description"><div dangerouslySetInnerHTML={createMarkup(location.sescription)}/></p>
        <p className="address">{location.address}</p>
        <p className="address"><a href={mapLink(location)} target="_blank">Directions <i className="fa fa-map-o"></i></a></p>
        <a className="location-website" href={location.website} target="_blank">Website <i className="fa fa-laptop"></i></a>
      </td>
    </tr>
  );
};
