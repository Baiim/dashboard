import axios from 'axios';
import { URL_API } from '@configs/keys';
import { getToken } from '@helpers/token';
import { errorReturn } from '@helpers/handleCallApi';

export const FETCH_ADMIN_BY_TOKEN_REQUEST = 'FETCH_ADMIN_BY_TOKEN_REQUEST';
export const FETCH_ADMIN_BY_TOKEN_SUCCESS = 'FETCH_ADMIN_BY_TOKEN_SUCCESS';
export const FETCH_ADMIN_BY_TOKEN_ERROR = 'FETCH_ADMIN_BY_TOKEN_ERROR';

export const GET_ROLE = 'GET_ROLE';

const PATH = `${URL_API}/admin`;

export const fetchDataByToken = () => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: FETCH_ADMIN_BY_TOKEN_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}/token`
    }).then(
      response => {
        dispatch({
          type: FETCH_ADMIN_BY_TOKEN_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({ type: FETCH_ADMIN_BY_TOKEN_ERROR, error: error.response });
        errorReturn(error, dispatch);
      }
    );
  };
};

export const getRole = () => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch =>
    axios({
      method: 'GET',
      url: `${URL_API}/role?status=true`
    }).then(response => {
      dispatch({ type: GET_ROLE, payload: response.data });
      return response.data;
    });
};
