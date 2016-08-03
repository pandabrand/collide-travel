import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MapRowComponent from './map-row.jsx';

const getComment = (comments,locationId) => {
  if(!comments)
    return;

  return comments.filter(function( obj ) {
    return obj.locationId == locationId;
  });
}

export const MapTableComponent = ({locations, markerCirlceHover, artist, artistComments, dispatch}) => {
  return <table className="table table-hover">
    <tbody>
      {locations.map(function(location,i){
          const comment = getComment(artistComments,location._id);
          return (<MapRowComponent key={i} dispatch={dispatch} location={location} item={i} hoverIndex={markerCirlceHover} artist={artist} comment={comment} />)
        })
      }
    </tbody>
  </table>;
}
