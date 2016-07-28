export default function mapTableRowClick(state = {}, action = {}) {
  switch(action.type) {
    case 'SET_MAP_TABLE_ROW_CLICK':
      return action.mapTableRowClick;
    default:
      return state;
  }
};
