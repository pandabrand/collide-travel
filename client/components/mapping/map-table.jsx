import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MapRowComponent from './map-row.jsx';
import setMapTableRowClick from '../../../lib/client/actions/set-map-table-row-click.js';

export const MapTableComponent = ({locations, markerCirlceHover, artists, artistComments, dispatch}) => {
  const getComments = (comments,locationId) => {
    if(!comments)
      return;

    return comments.filter(function( obj ) {
      return obj.locationId == locationId;
    });
  }


  return <table className="table table-hover map-table">
    <tbody>
      {locations.map(function(location,i){
          return (<MapRowComponent key={i} dispatch={dispatch} location={location} item={i} hoverIndex={markerCirlceHover} artists={artists} comments={getComments(artistComments, location._id)} />)
        })
      }
    </tbody>
  </table>;
}
