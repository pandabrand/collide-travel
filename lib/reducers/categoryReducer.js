export default function categoryExploreSelection(state = 'NO_TYPE', action = {}) {
  switch(action.type) {
    case 'SET_CATEGORY_SELECTION':
      return action.categoryType;
    default:
      return state;
  }
};
