import { get } from 'lodash';
import {
  CHANGE_PARAMS_SECTOR,
  RESET_PARAMS_SECTOR,
  FETCH_SECTOR_REQUEST,
  FETCH_SECTOR_SUCCESS,
  FETCH_SECTOR_ERROR,
  READ_SECTOR_REQUEST,
  READ_SECTOR_SUCCESS,
  READ_SECTOR_ERROR,
  UPDATE_SECTOR_REQUEST,
  UPDATE_SECTOR_SUCCESS,
  UPDATE_SECTOR_ERROR
} from '../actions/sector.action';

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
    case CHANGE_PARAMS_SECTOR:
      return {
        ...state,
        params: action.params
      };

    case RESET_PARAMS_SECTOR:
      return {
        ...state,
        params: {
          page: 1,
          limit: 10
        }
      };

    case FETCH_SECTOR_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_SECTOR_SUCCESS:
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
    case FETCH_SECTOR_ERROR:
      return {
        ...state,
        isLoading: false
      };

    case READ_SECTOR_REQUEST:
      return {
        ...state,
        isLoadingDetail: true
      };
    case READ_SECTOR_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        dataDetail: get(action, 'payload.data')
      };
    case READ_SECTOR_ERROR:
      return {
        ...state,
        isLoadingDetail: false
      };

    case UPDATE_SECTOR_REQUEST:
      return {
        ...state,
        isLoadingSubmit: true
      };
    case UPDATE_SECTOR_SUCCESS:
      return {
        ...state,
        isLoadingSubmit: false
      };
    case UPDATE_SECTOR_ERROR:
      return {
        ...state,
        isLoadingSubmit: false
      };

    default:
      return state;
  }
}
