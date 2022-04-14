import { get } from 'lodash';
import {
  CHANGE_PARAMS_STOCK,
  RESET_PARAMS_STOCK,
  FETCH_STOCK_REQUEST,
  FETCH_STOCK_SUCCESS,
  FETCH_STOCK_ERROR,
  READ_STOCK_REQUEST,
  READ_STOCK_SUCCESS,
  READ_STOCK_ERROR,
  UPDATE_STOCK_REQUEST,
  UPDATE_STOCK_SUCCESS,
  UPDATE_STOCK_ERROR,
  OPEN_RELATED_HASHTAGS_MODAL,
  OPEN_STOK_DETAIL_MODAL,
  CLOSE_STOCK_MODAL
} from '../actions/stock.action';

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

  isRelatedHashtagsModalOpen: false,
  isStockDetailModalOpen: false,
  selectedStock: {},

  isLoadingSubmit: false,

  isLoadingDetail: false,
  dataDetail: null
};

export default function StockReducer(state = initState, action) {
  switch (action.type) {
    case OPEN_RELATED_HASHTAGS_MODAL:
      return {
        ...state,
        isRelatedHashtagsModalOpen: true,
        selectedStock: action.payload
      };

    case OPEN_STOK_DETAIL_MODAL:
      return {
        ...state,
        isStockDetailModalOpen: true,
        selectedStock: action.payload
      };

    case CLOSE_STOCK_MODAL:
      return {
        ...state,
        isRelatedHashtagsModalOpen: false,
        isStockDetailModalOpen: false
      };

    case CHANGE_PARAMS_STOCK:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_STOCK:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10
        }
      };

    case FETCH_STOCK_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_STOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: get(action, 'payload.data', []) || [],
        pagination: {
          currentPage: action.payload.meta.current_page,
          lastPage: action.payload.meta.last_page,
          count: action.payload.meta.total,
          recordPerPage: action.payload.meta.per_page
        }
      };
    case FETCH_STOCK_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_STOCK_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };
    case READ_STOCK_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        dataDetail: get(action, 'payload.data')
      };
    case READ_STOCK_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_STOCK_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_STOCK_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_STOCK_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    default:
      return state;
  }
}
