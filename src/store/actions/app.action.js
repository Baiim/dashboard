export const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE';
export const setSidebarToggle = name => dispatch => {
  dispatch({
    type: SIDEBAR_TOGGLE,
    name
  });
};
