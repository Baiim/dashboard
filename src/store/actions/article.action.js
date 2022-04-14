import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_API } from '@configs/keys';
import { getToken } from '@helpers/token';
import { errorReturn, successToastReturn } from '@helpers/handleCallApi';

export const CHANGE_PARAMS_ARTICLE = 'CHANGE_PARAMS_ARTICLE';
export const RESET_PARAMS_ARTICLE = 'RESET_PARAMS_ARTICLE';

export const FETCH_ARTICLE_REQUEST = 'FETCH_ARTICLE_REQUEST';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_ERROR = 'FETCH_ARTICLE_ERROR';

export const READ_ARTICLE_REQUEST = 'READ_ARTICLE_REQUEST';
export const READ_ARTICLE_SUCCESS = 'READ_ARTICLE_SUCCESS';
export const READ_ARTICLE_ERROR = 'READ_ARTICLE_ERROR';

export const UPDATE_ARTICLE_REQUEST = 'UPDATE_ARTICLE_REQUEST';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_ERROR = 'UPDATE_ARTICLE_ERROR';

export const OPEN_MORE_DATA_MODAL = 'OPEN_MORE_DATA_MODAL';
export const CLOSE_MORE_DATA_MODAL = 'CLOSE_MORE_DATA_MODAL';

const PATH = `${URL_API}/article`;

export const openMoreDataModal = data => dispatch => {
  dispatch({ type: OPEN_MORE_DATA_MODAL, payload: data });
};

export const closeMoreDataodal = () => dispatch => {
  dispatch({ type: CLOSE_MORE_DATA_MODAL });
};

export const changeParams = (current, incoming) => dispatch => {
  const result = { ...current };

  Object.keys(incoming).map(key => {
    result[key] = incoming[key];
    return null;
  });

  dispatch({ type: CHANGE_PARAMS_ARTICLE, params: result });
};

export const resetParams = () => dispatch => {
  dispatch({ type: RESET_PARAMS_ARTICLE });
};

export const fetchData = params => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: FETCH_ARTICLE_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}`,
      params
    }).then(
      response => {
        dispatch({
          type: FETCH_ARTICLE_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: FETCH_ARTICLE_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const readDetail = id => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: READ_ARTICLE_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({
          type: READ_ARTICLE_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: READ_ARTICLE_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const createData = data => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_ARTICLE_REQUEST, loading: true });
    return axios({
      method: 'POST',
      url: `${PATH}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_ARTICLE_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_ARTICLE_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const updateData = (data, id) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_ARTICLE_REQUEST, loading: true });
    return axios({
      method: 'PUT',
      url: `${PATH}/id/${id}`,
      data
    }).then(
      response => {
        dispatch({ type: UPDATE_ARTICLE_SUCCESS, payload: response.data });
        return response.data;
      },
      error => {
        dispatch({ type: UPDATE_ARTICLE_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const deleteData = (id, params) => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPDATE_ARTICLE_REQUEST, loading: true });
    return axios({
      method: 'DELETE',
      url: `${PATH}/id/${id}`
    }).then(
      response => {
        dispatch({ type: UPDATE_ARTICLE_SUCCESS, payload: response.data });
        successToastReturn(response, 'Berhasil menghapus artikel');
        dispatch(fetchData(params));
      },
      error => {
        dispatch({ type: UPDATE_ARTICLE_ERROR, error: error.response });
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
