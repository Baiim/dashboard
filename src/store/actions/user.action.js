import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '@configs/keys';
import { getToken } from '@helpers/token';
import { errorReturn, successToastReturn } from '@helpers/handleCallApi';

export const CHANGE_PARAMS_USER = 'CHANGE_PARAMS_USER';
export const RESET_PARAMS_USER = 'RESET_PARAMS_USER';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const READ_USER_REQUEST = 'READ_USER_REQUEST';
export const READ_USER_SUCCESS = 'READ_USER_SUCCESS';
export const READ_USER_ERROR = 'READ_USER_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

const PATH = `${URL_API}/admin`;

export const changeParams = (current, incoming) => dispatch => {
  const result = { ...current };

  Object.keys(incoming).map(key => {
    result[key] = incoming[key];
    return null;
  });

  dispatch({ type: CHANGE_PARAMS_USER, params: result });
};

export const resetParams = () => dispatch => {
  dispatch({ type: RESET_PARAMS_USER });
};

export const fetchData = params => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: FETCH_USER_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}`,
      params
    }).then(
      response => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: FETCH_USER_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const readDetail = id => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: READ_USER_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: READ_USER_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: READ_USER_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const createData = data => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_USER_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${PATH}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_USER_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const updateData = (data, id) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_USER_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${PATH}/id/${id}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_USER_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const deleteData = (id, params) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_USER_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
        successToastReturn(response, 'Berhasil menghapus artikel');
        dispatch(fetchData(params));
      },
      error => {
        dispatch({ type: UPDATE_USER_ERROR, error: error.response });
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
