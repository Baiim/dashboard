import { get } from 'lodash';
import {
  CHANGE_PARAMS_USER,
  RESET_PARAMS_USER,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  READ_USER_REQUEST,
  READ_USER_SUCCESS,
  READ_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from '../actions/user.action';

const initState = {
  isLoading: false,
  data: [],
  params: {
    page: 1,
    limit: 10,
    sort: 'asc',
    sort_by: 'name',
    status: null,
    search: null
  },
  pagination: {
    currentPage: 1,
    lastPage: 1,
    count: 0,
    recordPerPage: 0
  },

  isLoadingSubmit: false,

  isLoadingDetail: false,
  dataDetail: null
};

export default function UserReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_PARAMS_USER:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_USER:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10,
          sort: 'asc',
          sort_by: 'name',
          status: null,
          search: null
        }
      };

    case FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: get(action, 'payload.data', []) || [],
        pagination: {
          currentPage: action.payload.meta.current_page,
          lastPage: action.payload.meta.last_page,
          count: action.payload.meta.count,
          recordPerPage: action.payload.meta.record_per_page
        }
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_USER_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };
    case READ_USER_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        dataDetail: get(action, 'payload.data')
      };
    case READ_USER_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    default:
      return state;
  }
}
