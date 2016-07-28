import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MapRow from './map-row.jsx';

export const MapTable = ({locations, markerCirlceHover, dispatch}) => (
  <table className="table table-hover">
    <tbody>
      {locations.map(function(location,i){
          return (<MapRow key={i} dispatch={dispatch} location={location} item={i} hoverIndex={markerCirlceHover} />)
        })
      }
    </tbody>
  </table>
);
