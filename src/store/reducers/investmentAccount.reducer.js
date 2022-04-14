import { get } from 'lodash';
import {
  CHANGE_PARAMS_INVESTMENT_ACCOUNT,
  RESET_PARAMS_INVESTMENT_ACCOUNT,
  FETCH_INVESTMENT_ACCOUNT_REQUEST,
  FETCH_INVESTMENT_ACCOUNT_SUCCESS,
  FETCH_INVESTMENT_ACCOUNT_ERROR
} from '../actions/investmentAccount.action';

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
    case CHANGE_PARAMS_INVESTMENT_ACCOUNT:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_INVESTMENT_ACCOUNT:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10
        }
      };

    case FETCH_INVESTMENT_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_INVESTMENT_ACCOUNT_SUCCESS:
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
    case FETCH_INVESTMENT_ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}
