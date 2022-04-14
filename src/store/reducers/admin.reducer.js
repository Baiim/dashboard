import { get } from 'lodash';
import {
  FETCH_ADMIN_BY_TOKEN_REQUEST,
  FETCH_ADMIN_BY_TOKEN_SUCCESS,
  FETCH_ADMIN_BY_TOKEN_ERROR,
  GET_ROLE
} from '../actions/admin.action';

const initState = {
  isLoading: false,
  isLoadingDetail: false,
  data: [],
  dataDetail: null,
  dataCurrent: null,
  roles: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    count: 0,
    recordPerPage: 0
  }
};

export default function AdminReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ADMIN_BY_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ADMIN_BY_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataCurrent: get(action, 'payload.data')
      };
    case FETCH_ADMIN_BY_TOKEN_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case GET_ROLE:
      return {
        ...state,
        roles: get(action, 'payload.data', []) || []
      };

    default:
      return state;
  }
}
