import React from 'react';
import {markerTableCircleStyle,markerTableCircleStyleHover} from './marker-style.js';
import setMapTableHover from '../../../lib/client/actions/set-map-table-hover.js';
import setMapTableRowClick from '../../../lib/client/actions/set-map-table-row-click.js';

export default function MapRow({location, item, hoverIndex, dispatch}){
  return (
    <tr onClick={() => {return dispatch(setMapTableRowClick({lat: location.lat, lng: location.lng}))}} onMouseOver={() => {return dispatch(setMapTableHover(item))}} onMouseOut={() => {return dispatch(setMapTableHover(-1))}}>
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
