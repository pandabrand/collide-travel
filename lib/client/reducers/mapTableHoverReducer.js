export default function mapTableHover(state = 'NO_HOVER', action = {}) {
  switch(action.type) {
    case 'SET_MAP_TABLE_HOVER':
      return action.mapTableHoverIndex;
    default:
      return state;
  }
};
