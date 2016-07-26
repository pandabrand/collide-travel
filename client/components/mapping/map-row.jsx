import React, { Component } from 'react';

export const MapRow = ({location, item}) =>
  (
    <tr>
      <td><img src={location.photo}/></td>
      <td>
        <div className="name-item"><span>{item+1}</span><div>{location.name}</div></div>
        <p>{location.address}</p>
        <p className="front-map-description">{location.description}</p>
        <a href={location.website} target="_blank">website</a>
      </td>
    </tr>
  );
