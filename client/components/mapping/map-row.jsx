import React from 'react';
import ReactDOM from 'react-dom';
import {markerTableCircleStyle,markerTableCircleStyleHover} from './marker-style.js';
import setMapTableHover from '../../../lib/client/actions/set-map-table-hover.js';
import setMapTableRowClick from '../../../lib/client/actions/set-map-table-row-click.js';
import MapIconComponent from './map-icons.jsx';
import store from '../../../lib/client/store/store.js';

export default function MapRowComponent({location, item, hoverIndex, artist, comment, dispatch}){
  const handleScroll = () => {
    document.getElementById(location._id).scrollIntoView();
  };

  store.subscribe(() => {
    let state = store.getState()
    if(item === parseInt(state.markerCirlceHover)) {
      handleScroll()
    }
  })

  const addComment = () => {
    if(comment && comment.length > 0)
      return <div className="artist-comments"><div className="artist-comments-header">{artist.artistName} says: </div><div className="artist-comments-body">{comment[0].comment}</div></div>;
  }

  const mapLink = (location) => {
    return 'https://www.google.com/maps/dir/Current+Location/'+location.location.lat+','+location.location.lng;
  }

  return (
    <tr id={location._id} onClick={() => {return dispatch(setMapTableRowClick({lat: location.lat, lng: location.lng}))}} onMouseOver={() => {return dispatch(setMapTableHover(item))}} onMouseOut={() => {return dispatch(setMapTableHover(-1))}}>
      <td><div className="map-photo"><img src={location.photo}/></div></td>
      <td>
        <div className="name-item">
          <div style={item === parseInt(hoverIndex) ? markerTableCircleStyleHover : markerTableCircleStyle}><MapIconComponent type={location.type}/></div>
          <div className="table-map-location-name">{location.name}</div>
        </div>
        <p className="front-map-description">{location.description}</p>
        <p className="address"><a href={mapLink(location)} target="_blank">{location.address}</a></p>
        <a className="location-website" href={location.website} target="_blank">website</a>
        {addComment()}
      </td>
    </tr>
  );
};
