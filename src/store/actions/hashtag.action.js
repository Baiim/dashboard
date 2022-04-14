import { URL_API2 } from '@configs/keys';
import { errorReturn, successToastReturn } from '@helpers/handleCallApi';
import { getToken } from '@helpers/token';
import axios from 'axios';
import Swal from 'sweetalert2';

export const CHANGE_PARAMS_HASHTAG = 'CHANGE_PARAMS_HASHTAG';
export const RESET_PARAMS_HASHTAG = 'RESET_PARAMS_HASHTAG';

export const FETCH_HASHTAG_REQUEST = 'FETCH_HASHTAG_REQUEST';
export const FETCH_HASHTAG_SUCCESS = 'FETCH_HASHTAG_SUCCESS';
export const FETCH_HASHTAG_ERROR = 'FETCH_HASHTAG_ERROR';

export const READ_HASHTAG_REQUEST = 'READ_HASHTAG_REQUEST';
export const READ_HASHTAG_SUCCESS = 'READ_HASHTAG_SUCCESS';
export const READ_HASHTAG_ERROR = 'READ_HASHTAG_ERROR';

export const UPDATE_HASHTAG_REQUEST = 'UPDATE_HASHTAG_REQUEST';
export const UPDATE_HASHTAG_SUCCESS = 'UPDATE_HASHTAG_SUCCESS';
export const UPDATE_HASHTAG_ERROR = 'UPDATE_HASHTAG_ERROR';

export const OPEN_HASHTAG_MODAL = 'OPEN_HASHTAG_MODAL';
export const CLOSE_HASHTAG_MODAL = 'CLOSE_HASHTAG_MODAL';

const PATH = `${URL_API2}/category/`;

export const openHashtagModal = data => dispatch => {
  dispatch({ type: OPEN_HASHTAG_MODAL, payload: data });
};

export const closeHashtagModal = () => dispatch => {
  dispatch({ type: CLOSE_HASHTAG_MODAL });
};

export const changeParams = (current, incoming) => dispatch => {
  const result = { ...current };

  Object.keys(incoming).map(key => {
    result[key] = incoming[key];
    return null;
  });

  dispatch({ type: CHANGE_PARAMS_HASHTAG, params: result });
};

export const resetParams = () => dispatch => {
  dispatch({ type: RESET_PARAMS_HASHTAG });
};

export const fetchData = params => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: FETCH_HASHTAG_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}`,
      params
    }).then(
      response => {
        dispatch({
          type: FETCH_HASHTAG_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: FETCH_HASHTAG_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const readData = id => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: READ_HASHTAG_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: READ_HASHTAG_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: READ_HASHTAG_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const createData = data => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_HASHTAG_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${PATH}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_HASHTAG_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_HASHTAG_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const updateData = (data, id) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_HASHTAG_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${PATH}/id/${id}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_HASHTAG_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_HASHTAG_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const deleteData = (id, params) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_HASHTAG_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({ type: UPDATE_HASHTAG_SUCCESS, payload: response.data });
        successToastReturn(response, 'Berhasil menghapus member');
        dispatch(fetchData(params));
      },
      error => {
        dispatch({ type: UPDATE_HASHTAG_ERROR, error: error.response });
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
