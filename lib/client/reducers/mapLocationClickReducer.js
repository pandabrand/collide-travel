export default function mapLocationClick(state = -1, action = {}) {
  switch(action.type) {
    case 'SET_MAP_LOCATION_CLICK':
      var mlc = state !== action.mapLocationClick ? action.mapLocationClick : -1;
      return mlc;

    default:
      return state;
  }
};
