import { SIDEBAR_TOGGLE } from '@actions/app.action';

const initState = {
  sidebar: {
    name: null
  }
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          name: action.name
        }
      };
    default:
      return state;
  }
}
