export default function mapTableRowClick(state = {}, action = {}) {
  switch(action.type) {
    case 'SET_MAP_TABLE_ROW_CLICK':
      const mlc_item = ((!state && action.mapTableRowClick) || (state && action.mapTableRowClick && state.item !== action.mapTableRowClick.item)) ? action.mapTableRowClick.item : -1;
      const mlc_coord = ((!state && action.mapTableRowClick) || (state && action.mapTableRowClick)) ? action.mapTableRowClick.coord : {};
      const mlc = {item: mlc_item, coord: mlc_coord};
      return mlc;
    default:
      return state;
  }
};
