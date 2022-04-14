import { errorReturn } from '@helpers/handleCallApi';
import { getToken } from '@helpers/token';
import axios from 'axios';

const { URL_API } = require('@configs/keys');

const PATH = `${URL_API}/user`;

export const CHANGE_PARAMS_INVESTMENT_ACCOUNT =
  'CHANGE_PARAMS_INVESTMENT_ACCOUNT';
export const RESET_PARAMS_INVESTMENT_ACCOUNT =
  'RESET_PARAMS_INVESTMENT_ACCOUNT';

export const FETCH_INVESTMENT_ACCOUNT_REQUEST =
  'FETCH_INVESTMENT_ACCOUNT_REQUEST';
export const FETCH_INVESTMENT_ACCOUNT_SUCCESS =
  'FETCH_INVESTMENT_ACCOUNT_SUCCESS';
export const FETCH_INVESTMENT_ACCOUNT_ERROR = 'FETCH_INVESTMENT_ACCOUNT_ERROR';

export const changeParams = (current, incoming) => dispatch => {
  const result = { ...current };

  Object.keys(incoming).map(key => {
    result[key] = incoming[key];
    return null;
  });

  dispatch({ type: CHANGE_PARAMS_INVESTMENT_ACCOUNT, params: result });
};

export const resetParams = () => dispatch => {
  dispatch({ type: RESET_PARAMS_INVESTMENT_ACCOUNT });
};

export const fetchData = params => {
  const token = getToken() || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: FETCH_INVESTMENT_ACCOUNT_REQUEST, loading: true });
    return axios({
      method: 'GET',
      url: `${PATH}`,
      params
    }).then(
      response => {
        dispatch({
          type: FETCH_INVESTMENT_ACCOUNT_SUCCESS,
          payload: response.data
        });
        return response.data;
      },
      error => {
        dispatch({
          type: FETCH_INVESTMENT_ACCOUNT_ERROR,
          error: error.response
        });
        errorReturn(error, dispatch);
      }
    );
  };
};
