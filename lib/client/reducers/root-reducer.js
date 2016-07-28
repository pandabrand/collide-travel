import { combineReducers } from 'redux';
import markerCirlceHover from './hoverReducer.js';
import mapTableHover from './mapTableHoverReducer.js';
import mapTableRowClick from './mapTableRowClickReducer.js';

const rootReducer = combineReducers({
  markerCirlceHover,
  mapTableHover,
  mapTableRowClick
});

export default rootReducer;
