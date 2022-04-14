import { get } from 'lodash';
import {
  CHANGE_PARAMS_MEMBER,
  RESET_PARAMS_MEMBER,
  FETCH_MEMBER_REQUEST,
  FETCH_MEMBER_SUCCESS,
  FETCH_MEMBER_ERROR,
  READ_MEMBER_REQUEST,
  READ_MEMBER_SUCCESS,
  READ_MEMBER_ERROR,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_ERROR
} from '../actions/member.action';

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

export default function GroupChatReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_PARAMS_MEMBER:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_MEMBER:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10
        }
      };

    case FETCH_MEMBER_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_MEMBER_SUCCESS:
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
    case FETCH_MEMBER_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_MEMBER_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };
    case READ_MEMBER_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        dataDetail: get(action, 'payload.data')
      };
    case READ_MEMBER_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_MEMBER_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_MEMBER_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    default:
      return state;
  }
}
