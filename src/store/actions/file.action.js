/* eslint-disable camelcase */
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { URL_API } from '@configs/keys';
import { errorReturn } from '@helpers/handleCallApi';

const cookies = new Cookies();

export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_ERROR = 'UPLOAD_FILE_ERROR';

export const SET_FILE = 'SET_IMAGE';
export const RESET_FILE = 'RESET_IMAGE';

const PATH = `${URL_API}/file`;

export const uploadFile = (data, file_type) => {
  const token = cookies.get('id_token') || null;
  axios.defaults.headers.common.Authorization = `${token}`;
  return dispatch => {
    dispatch({ type: UPLOAD_FILE_REQUEST, file_type });
    return axios({
      method: 'POST',
      url: `${PATH}`,
      data
    }).then(
      response => {
        dispatch({
          type: UPLOAD_FILE_SUCCESS,
          payload: response.data,
          file_type
        });
        return response;
      },
      error => {
        dispatch({
          type: UPLOAD_FILE_ERROR,
          error: error.response,
          file_type
        });
        errorReturn(error);
        throw error;
      }
    );
  };
};

export const setFile = (file, file_type) => dispatch => {
  dispatch({
    type: SET_FILE,
    file,
    file_type
  });
};

export const resetFile = file_type => dispatch =>
  dispatch({
    type: RESET_FILE,
    file_type
  });
