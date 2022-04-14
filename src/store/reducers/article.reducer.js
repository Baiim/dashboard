import { get } from 'lodash';
import {
  CHANGE_PARAMS_ARTICLE,
  RESET_PARAMS_ARTICLE,
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  READ_ARTICLE_REQUEST,
  READ_ARTICLE_SUCCESS,
  READ_ARTICLE_ERROR,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_ERROR
} from '../actions/article.action';

const initState = {
  isLoading: false,
  data: [],
  params: {
    page: 1,
    limit: 10,
    sort: 'desc',
    by: 'created_at',
    status: null,
    title: null
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

export default function ArticleReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_PARAMS_ARTICLE:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_ARTICLE:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10,
          sort: 'asc',
          by: 'title',
          status: null,
          title: null
        }
      };

    case FETCH_ARTICLE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_ARTICLE_SUCCESS:
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
    case FETCH_ARTICLE_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_ARTICLE_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };
    case READ_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        dataDetail: get(action, 'payload.data')
      };
    case READ_ARTICLE_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_ARTICLE_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_ARTICLE_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    default:
      return state;
  }
}
