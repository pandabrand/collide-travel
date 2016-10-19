export default function artistExploreSelection(state = '0', action = {}) {
  switch(action.type) {
    case 'SET_ARTIST_SELECTION':
      return action.artistId;
    default:
      return state;
  }
};
