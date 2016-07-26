import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import {MapRow} from './map-row.jsx';

export const MapTable = ({locations}) => (
  <table className="table table-hover">
    <tbody>
      {locations.map(function(location,i){
          return (<MapRow key={i} location={location} item={i}/>)
        })
      }
    </tbody>
  </table>
);
