export default function mobileMapRowPositionScroll(state = '-1', action = {}) {
  switch(action.type) {
    case 'SET_MOBILE_MAP_ROW_POSITION':
      return action.mobileMapRowPosition;
    default:
      return state;
  }
};
