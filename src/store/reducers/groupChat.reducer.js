import { get } from 'lodash';
import {
  CHANGE_PARAMS_GROUPCHAT,
  RESET_PARAMS_GROUPCHAT,
  FETCH_GROUPCHAT_REQUEST,
  FETCH_GROUPCHAT_SUCCESS,
  FETCH_GROUPCHAT_ERROR,
  READ_GROUPCHAT_REQUEST,
  READ_GROUPCHAT_SUCCESS,
  READ_GROUPCHAT_ERROR,
  UPDATE_GROUPCHAT_REQUEST,
  UPDATE_GROUPCHAT_SUCCESS,
  UPDATE_GROUPCHAT_ERROR
} from '../actions/groupChat.action';

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
    case CHANGE_PARAMS_GROUPCHAT:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_GROUPCHAT:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10
        }
      };

    case FETCH_GROUPCHAT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_GROUPCHAT_SUCCESS:
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
    case FETCH_GROUPCHAT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_GROUPCHAT_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };
    case READ_GROUPCHAT_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        dataDetail: get(action, 'payload.data')
      };
    case READ_GROUPCHAT_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_GROUPCHAT_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_GROUPCHAT_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_GROUPCHAT_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    default:
      return state;
  }
}
