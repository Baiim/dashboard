import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '@configs/keys';
import { getToken } from '@helpers/token';
import { errorReturn, successToastReturn } from '@helpers/handleCallApi';

export const CHANGE_PARAMS_WEBINAR = 'CHANGE_PARAMS_WEBINAR';
export const RESET_PARAMS_WEBINAR = 'RESET_PARAMS_WEBINAR';

export const FETCH_WEBINAR_REQUEST = 'FETCH_WEBINAR_REQUEST';
export const FETCH_WEBINAR_SUCCESS = 'FETCH_WEBINAR_SUCCESS';
export const FETCH_WEBINAR_ERROR = 'FETCH_WEBINAR_ERROR';

export const READ_WEBINAR_REQUEST = 'READ_WEBINAR_REQUEST';
export const READ_WEBINAR_SUCCESS = 'READ_WEBINAR_SUCCESS';
export const READ_WEBINAR_ERROR = 'READ_WEBINAR_ERROR';

export const UPDATE_WEBINAR_REQUEST = 'UPDATE_WEBINAR_REQUEST';
export const UPDATE_WEBINAR_SUCCESS = 'UPDATE_WEBINAR_SUCCESS';
export const UPDATE_WEBINAR_ERROR = 'UPDATE_WEBINAR_ERROR';

const PATH = `${URL_API}/webinar`;

export const changeParams = (current, incoming) => dispatch => {
  const result = { ...current };

  Object.keys(incoming).map(key => {
    result[key] = incoming[key];
    return null;
  });

  dispatch({ type: CHANGE_PARAMS_WEBINAR, params: result });
};

export const resetParams = () => dispatch => {
  dispatch({ type: RESET_PARAMS_WEBINAR });
};

export const fetchData = params => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: FETCH_WEBINAR_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}`,
      params
    }).then(
      response => {
        dispatch({
          type: FETCH_WEBINAR_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: FETCH_WEBINAR_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const readData = id => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: READ_WEBINAR_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: READ_WEBINAR_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: READ_WEBINAR_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const createData = data => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_WEBINAR_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${PATH}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_WEBINAR_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_WEBINAR_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const updateData = (data, id) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_WEBINAR_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${PATH}/id/${id}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_WEBINAR_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_WEBINAR_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const deleteData = (id, params) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_WEBINAR_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({ type: UPDATE_WEBINAR_SUCCESS, payload: response.data });
        successToastReturn(response, 'Berhasil menghapus webinar');
        dispatch(fetchData(params));
      },
      error => {
        dispatch({ type: UPDATE_WEBINAR_ERROR, error: error.response });
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
