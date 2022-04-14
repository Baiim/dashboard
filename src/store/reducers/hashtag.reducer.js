import { get } from 'lodash';
import {
  CHANGE_PARAMS_HASHTAG,
  RESET_PARAMS_HASHTAG,
  FETCH_HASHTAG_REQUEST,
  FETCH_HASHTAG_SUCCESS,
  FETCH_HASHTAG_ERROR,
  READ_HASHTAG_REQUEST,
  READ_HASHTAG_SUCCESS,
  READ_HASHTAG_ERROR,
  UPDATE_HASHTAG_REQUEST,
  UPDATE_HASHTAG_SUCCESS,
  UPDATE_HASHTAG_ERROR,
  OPEN_HASHTAG_MODAL,
  CLOSE_HASHTAG_MODAL
} from '../actions/hashtag.action';

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

  isOpenModal: false,
  modalData: {
    title: '',
    items: []
  },

  isLoadingSubmit: false,

  isLoadingDetail: false,
  dataDetail: null
};

export default function HashtagReducer(state = initState, action) {
  switch (action.type) {
    case OPEN_HASHTAG_MODAL:
      return {
        ...state,
        isOpenModal: true,
        modalData: action.payload
      };

    case CLOSE_HASHTAG_MODAL:
      return {
        ...state,
        isOpenModal: false
      };

    case CHANGE_PARAMS_HASHTAG:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_HASHTAG:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10
        }
      };

    case FETCH_HASHTAG_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_HASHTAG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: get(action, 'payload.data', []) || [],
        pagination: {
          currentPage: action.payload.meta?.current_page,
          lastPage: action.payload.meta?.last_page,
          count: action.payload.meta?.total,
          recordPerPage: action.payload.meta?.per_page
        }
      };
    case FETCH_HASHTAG_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_HASHTAG_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };
    case READ_HASHTAG_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        dataDetail: get(action, 'payload.data')
      };
    case READ_HASHTAG_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_HASHTAG_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_HASHTAG_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_HASHTAG_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    default:
      return state;
  }
}
