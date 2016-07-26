import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {markerStyle} from './marker-style.js';

export const MapMarker = ({location, item}) => (
  <div style={markerStyle}>
     {item+1}
  </div>
)
