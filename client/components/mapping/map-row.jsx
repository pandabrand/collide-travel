import React, { Component } from 'react';
import {markerTableCircleStyle,markerCircleStyleHover} from './marker-style.js';

export const MapRow = ({location, item}) =>
  (
    <tr>
      <td><img src={location.photo}/></td>
      <td>
        <div className="name-item"><div style={markerTableCircleStyle}>{item+1}</div><div className="table-map-location-name">{location.name}</div></div>
        <p>{location.address}</p>
        <p className="front-map-description">{location.description}</p>
        <a href={location.website} target="_blank">website</a>
      </td>
    </tr>
  );
