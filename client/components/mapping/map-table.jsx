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

export const MapTableComponent = ({locations, markerCirlceHover, artists, artistComments, dispatch}) => {
  return <table className="table table-hover map-table">
    <tbody>
      {locations.map(function(location,i){
          const comment = getComment(artistComments,location._id);
          return (<MapRowComponent key={i} dispatch={dispatch} location={location} item={i} hoverIndex={markerCirlceHover} artists={artists} comment={comment} />)
        })
      }
    </tbody>
  </table>;
}
