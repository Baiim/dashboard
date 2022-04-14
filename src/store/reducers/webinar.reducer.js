import { get } from 'lodash';
import {
  CHANGE_PARAMS_WEBINAR,
  RESET_PARAMS_WEBINAR,
  FETCH_WEBINAR_REQUEST,
  FETCH_WEBINAR_SUCCESS,
  FETCH_WEBINAR_ERROR,
  READ_WEBINAR_REQUEST,
  READ_WEBINAR_SUCCESS,
  READ_WEBINAR_ERROR,
  UPDATE_WEBINAR_REQUEST,
  UPDATE_WEBINAR_SUCCESS,
  UPDATE_WEBINAR_ERROR
} from '../actions/webinar.action';

const initState = {
  isLoading: false,
  data: [],
  params: {
    page: 1,
    limit: 10
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

export default function WebinarReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_PARAMS_WEBINAR:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_WEBINAR:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10
        }
      };

    case FETCH_WEBINAR_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_WEBINAR_SUCCESS:
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
    case FETCH_WEBINAR_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_WEBINAR_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };
    case READ_WEBINAR_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        dataDetail: get(action, 'payload.data')
      };
    case READ_WEBINAR_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_WEBINAR_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_WEBINAR_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_WEBINAR_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    default:
      return state;
  }
}
