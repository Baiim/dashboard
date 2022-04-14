import { URL_API2 } from '@configs/keys';
import { errorReturn, successToastReturn } from '@helpers/handleCallApi';
import { getToken } from '@helpers/token';
import axios from 'axios';
import Swal from 'sweetalert2';

export const CHANGE_PARAMS_STOCK = 'CHANGE_PARAMS_STOCK';
export const RESET_PARAMS_STOCK = 'RESET_PARAMS_STOCK';

export const FETCH_STOCK_REQUEST = 'FETCH_STOCK_REQUEST';
export const FETCH_STOCK_SUCCESS = 'FETCH_STOCK_SUCCESS';
export const FETCH_STOCK_ERROR = 'FETCH_STOCK_ERROR';

export const READ_STOCK_REQUEST = 'READ_STOCK_REQUEST';
export const READ_STOCK_SUCCESS = 'READ_STOCK_SUCCESS';
export const READ_STOCK_ERROR = 'READ_STOCK_ERROR';

export const UPDATE_STOCK_REQUEST = 'UPDATE_STOCK_REQUEST';
export const UPDATE_STOCK_SUCCESS = 'UPDATE_STOCK_SUCCESS';
export const UPDATE_STOCK_ERROR = 'UPDATE_STOCK_ERROR';

export const OPEN_RELATED_HASHTAGS_MODAL = 'OPEN_RELATED_HASHTAGS_MODAL';
export const OPEN_STOK_DETAIL_MODAL = 'OPEN_STOK_DETAIL_MODAL';
export const CLOSE_STOCK_MODAL = 'CLOSE_STOCK_MODAL';

const PATH = `${URL_API2}/stock`;

export const openStockModal = (modalType, stock) => dispatch => {
  dispatch({ type: modalType, payload: stock });
};

export const closeStockModal = () => dispatch => {
  dispatch({ type: CLOSE_STOCK_MODAL });
};

export const changeParams = (current, incoming) => dispatch => {
  const result = { ...current };

  Object.keys(incoming).map(key => {
    result[key] = incoming[key];
    return null;
  });

  dispatch({ type: CHANGE_PARAMS_STOCK, params: result });
};

export const resetParams = () => dispatch => {
  dispatch({ type: RESET_PARAMS_STOCK });
};

export const fetchData = params => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: FETCH_STOCK_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}`,
      params
    }).then(
      response => {
        dispatch({
          type: FETCH_STOCK_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: FETCH_STOCK_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const readData = id => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: READ_STOCK_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${URL_API2}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: READ_STOCK_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: READ_STOCK_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const createData = data => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_STOCK_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${PATH}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_STOCK_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_STOCK_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const updateData = (data, id) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_STOCK_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${PATH}/id/${id}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_STOCK_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_STOCK_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const deleteData = (id, params) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_STOCK_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({ type: UPDATE_STOCK_SUCCESS, payload: response.data });
        successToastReturn(response, 'Berhasil menghapus member');
        dispatch(fetchData(params));
      },
      error => {
        dispatch({ type: UPDATE_STOCK_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const setDeleteModal = (id, params) => dispatch => {
  Swal.fire({
    title: 'Apakah Anda yakin akan menghapus data ini?',
    icon: 'warning',
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal'
  }).then(result => {
    if (result.isConfirmed) {
      dispatch(deleteData(id, params));
    }
  });
};
