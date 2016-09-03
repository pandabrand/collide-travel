export default function mapPositionScroll(state = false, action = {}) {
  switch(action.type) {
    case 'SET_MAP_POSITION':
      return action.mapPosition;
    default:
      return state;
  }
};
