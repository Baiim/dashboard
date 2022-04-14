import { Cookies } from 'react-cookie';
import { errorMessage } from '@helpers/messageTranslator';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions/auth.action';
import JwtAuthentication from '../../helpers/jwtAuthentication';

const cookies = new Cookies();

const localToken = JwtAuthentication.checkExpirity(cookies.get('id_token'));

const initState = {
  isFetching: false,
  isAuthenticated: !!localToken.token,
  isLoading: false,
  data: null,
  dataRole: []
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: '',
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        isLoading: false
      };
    case LOGIN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: errorMessage(action.message),
        isLoading: false
      };
    }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state;
  }
}
