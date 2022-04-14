import { get } from 'lodash';
import {
  CHANGE_PARAMS_FAQ,
  RESET_PARAMS_FAQ,
  FETCH_FAQ_REQUEST,
  FETCH_FAQ_SUCCESS,
  FETCH_FAQ_ERROR,
  READ_FAQ_REQUEST,
  READ_FAQ_SUCCESS,
  READ_FAQ_ERROR,
  UPDATE_FAQ_REQUEST,
  UPDATE_FAQ_SUCCESS,
  UPDATE_FAQ_ERROR
} from '../actions/faq.action';

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
  dataDetail: {}
};

export default function FaqReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_PARAMS_FAQ:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_FAQ:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10
        }
      };

    case FETCH_FAQ_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_FAQ_SUCCESS:
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
    case FETCH_FAQ_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_FAQ_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };

    case READ_FAQ_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        dataDetail: get(action, 'payload.data')
      };

    case READ_FAQ_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_FAQ_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_FAQ_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_FAQ_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    default:
      return state;
  }
}
