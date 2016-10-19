export default function mobileMenuClick(state = false, action = {}) {
  switch(action.type) {
    case 'SET_MOBILE_MENU_CLICK':
      return action.mobileMenuClick;
    default:
      return state;
  }
};
