import React from 'react';
import ReactDOM from 'react-dom';
import {markerTableCircleStyle,markerTableCircleStyleHover} from './marker-style.js';
import setMapTableHover from '../../../lib/client/actions/set-map-table-hover.js';
import setMapTableRowClick from '../../../lib/client/actions/set-map-table-row-click.js';
import MapIconComponent from './map-icons.jsx';
import store from '../../../lib/client/store/store.js';
import {createMarkup} from '../../lib/utils.js';
import {MapCommentComponent} from './map-comments.jsx';

export default function MapRowComponent({location, item, hoverIndex, artists, comments, dispatch}){
  const handleScroll = () => {
    document.getElementById(location._id).scrollIntoView();
  };

  store.subscribe(() => {
    let state = store.getState()
    if(item === parseInt(state.markerCirlceHover)) {
      // handleScroll()
    }
  })

  const getArtist = (comment, artists) => {
    if(!comment)
      return;

    const _a = artists.filter((artist) => {
      return artist._id === comment.artistId;
    });
    console.dir(_a);
    return _a[0];
  }


  const addComment = () => {

    if(comment && comment[0] && !comment[0].hideComment && comment[0].comment && comment[0].comment.length > 0  && comment.comment !== 'undefined') {
      const _a = _.findWhere(artists, {_id:comment[0].artistId});
      return <div style={{boxShadow: '1px 1px 2px 0 '+ _a.color}} className="artist-comments"><div className="artist-comments-header">{_a.artistName} says: </div><div className="artist-comments-body">{comment[0].comment}</div></div>;
    } else {
      return <div style={{boxShadow: '1px 1px 2px 0 '+ _a.color}} className="artist-comments"><div className="artist-comments-header">{_a.artistName} Recommendation</div></div>;
    }
  }

  const mapLink = (location) => {
    return 'https://www.google.com/maps/dir/Current+Location/'+location.location.lat+','+location.location.lng;
  }

  const imgFile = location.photo.substr(location.photo.lastIndexOf('/') + 1);
  const imgSrc = $.cloudinary.url( imgFile, {width:150, height:150, crop:"fill"});

  return (
    <tr id={location._id} onClick={() => {return dispatch(setMapTableRowClick({item: item, coord: location.location}))}} onMouseOver={() => {return dispatch(setMapTableHover(item))}} onMouseOut={() => {return dispatch(setMapTableHover(-1))}}>
      <td><div className="map-photo"><img src={imgSrc}/></div></td>
      <td>
        <div className="name-item">
          {/*<div style={item === parseInt(hoverIndex) ? markerTableCircleStyleHover : markerTableCircleStyle}><MapIconComponent type={location.type}/></div>*/}
          <div className="table-map-location-name">{location.name}</div>
        </div>
        {comments.map((comment) => {
          return <MapCommentComponent key={comment._id} artist={getArtist(comment, artists)} comment={comment}/>;
        })}
        <div className="front-map-description"><div dangerouslySetInnerHTML={createMarkup(location.description)}/></div>
        <p className="address">{location.address}</p>
        <div className="map-links"><a href={mapLink(location)} target="_blank">Directions <i className="fa fa-map-o"></i></a></div>
        <div className="map-links"><a className="location-website" href={location.website} target="_blank">Website <i className="fa fa-laptop"></i></a></div>
      </td>
    </tr>
  );
};
