import { combineReducers } from 'redux';
import markerCirlceHover from './hoverReducer.js';
import mapTableHover from './mapTableHoverReducer.js';
import mapTableRowClick from './mapTableRowClickReducer.js';
import cityExploreSelection from './cityReducer.js';
import artistExploreSelection from './artistReducer.js';
import categoryExploreSelection from './categoryReducer.js';
import mapLocationClick from './mapLocationClickReducer.js';
import mapPosition from './mapPositionReducer.js';
import mobileMapRowPosition from './mobileMapRowPositionReducer.js';
import mobileMenuClick from './mobileMenuClickReducer.js';

const rootReducer = combineReducers({
  markerCirlceHover,
  mapTableHover,
  mapTableRowClick,
  cityExploreSelection,
  artistExploreSelection,
  categoryExploreSelection,
  mapLocationClick,
  mapPosition,
  mobileMapRowPosition,
  mobileMenuClick,
});

export default rootReducer;
