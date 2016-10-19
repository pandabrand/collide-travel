export default function markerCirlceHover(state = 'NO_HOVER', action = {}) {
  switch(action.type) {
    case 'SET_CIRCLE_HOVER':
      return action.hoverIndex;
    default:
      return state;
  }
};
