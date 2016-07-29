import { combineReducers } from 'redux';
import markerCirlceHover from './hoverReducer.js';
import mapTableHover from './mapTableHoverReducer.js';
import mapTableRowClick from './mapTableRowClickReducer.js';
import cityExploreSelection from './cityReducer.js';
import artistExploreSelection from './artistReducer.js';
import categoryExploreSelection from './categoryReducer.js';

const rootReducer = combineReducers({
  markerCirlceHover,
  mapTableHover,
  mapTableRowClick,
  cityExploreSelection,
  artistExploreSelection,
  categoryExploreSelection
});

export default rootReducer;
