import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '@configs/keys';
import { getToken } from '@helpers/token';
import { errorReturn, successToastReturn } from '@helpers/handleCallApi';

export const CHANGE_PARAMS_GROUPCHAT = 'CHANGE_PARAMS_GROUPCHAT';
export const RESET_PARAMS_GROUPCHAT = 'RESET_PARAMS_GROUPCHAT';

export const FETCH_GROUPCHAT_REQUEST = 'FETCH_GROUPCHAT_REQUEST';
export const FETCH_GROUPCHAT_SUCCESS = 'FETCH_GROUPCHAT_SUCCESS';
export const FETCH_GROUPCHAT_ERROR = 'FETCH_GROUPCHAT_ERROR';

export const READ_GROUPCHAT_REQUEST = 'READ_GROUPCHAT_REQUEST';
export const READ_GROUPCHAT_SUCCESS = 'READ_GROUPCHAT_SUCCESS';
export const READ_GROUPCHAT_ERROR = 'READ_GROUPCHAT_ERROR';

export const UPDATE_GROUPCHAT_REQUEST = 'UPDATE_GROUPCHAT_REQUEST';
export const UPDATE_GROUPCHAT_SUCCESS = 'UPDATE_GROUPCHAT_SUCCESS';
export const UPDATE_GROUPCHAT_ERROR = 'UPDATE_GROUPCHAT_ERROR';

const PATH = `${URL_API}/groupChat`;

export const changeParams = (current, incoming) => dispatch => {
  const result = { ...current };

  Object.keys(incoming).map(key => {
    result[key] = incoming[key];
    return null;
  });

  dispatch({ type: CHANGE_PARAMS_GROUPCHAT, params: result });
};

export const resetParams = () => dispatch => {
  dispatch({ type: RESET_PARAMS_GROUPCHAT });
};

export const fetchData = params => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: FETCH_GROUPCHAT_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}`,
      params
    }).then(
      response => {
        dispatch({
          type: FETCH_GROUPCHAT_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: FETCH_GROUPCHAT_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const readData = id => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: READ_GROUPCHAT_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: READ_GROUPCHAT_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: READ_GROUPCHAT_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const createData = data => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_GROUPCHAT_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${PATH}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_GROUPCHAT_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_GROUPCHAT_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const updateData = (data, id) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_GROUPCHAT_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${PATH}/id/${id}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_GROUPCHAT_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_GROUPCHAT_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const deleteData = (id, params) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_GROUPCHAT_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({ type: UPDATE_GROUPCHAT_SUCCESS, payload: response.data });
        successToastReturn(response, 'Berhasil menghapus group chat');
        dispatch(fetchData(params));
      },
      error => {
        dispatch({ type: UPDATE_GROUPCHAT_ERROR, error: error.response });
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
