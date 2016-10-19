export default function cityExploreSelection(state = '0', action = {}) {
  switch(action.type) {
    case 'SET_CITY_SELECTION':
      return action.cityId;
    default:
      return state;
  }
};
