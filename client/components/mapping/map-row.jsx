import React from 'react';
import {markerTableCircleStyle,markerTableCircleStyleHover} from './marker-style.js';

export default function MapRow({location, item, hoverIndex}){
  return (
    <tr>
      <td><img src={location.photo}/></td>
      <td>
        <div className="name-item">
          <div style={item === parseInt(hoverIndex) ? markerTableCircleStyleHover : markerTableCircleStyle}>{item+1}</div>
          <div className="table-map-location-name">{location.name}</div>
        </div>
        <p>{location.address}</p>
        <p className="front-map-description">{location.description}</p>
        <a href={location.website} target="_blank">website</a>
      </td>
    </tr>
  );
};
