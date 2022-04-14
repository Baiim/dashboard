import axios from 'axios';
import { Cookies } from 'react-cookie';
import { URL_API } from '@configs/keys';

const cookies = new Cookies();

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: data.token
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function setLogin(response) {
  cookies.set('id_token', `Bearer ${response.data.data.token}`, {
    path: '/'
  });
}

export function loginUser(data) {
  const headers = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };
  return dispatch => {
    dispatch(requestLogin(data));
    return axios.post(`${URL_API}/admin/login`, data, { headers }).then(
      response => {
        dispatch(receiveLogin(response.data));
        setLogin(response);
        window.location.href = '/user-management';
      },
      error => {
        dispatch(
          loginError(
            error.response ? error.response.data.stat_msg : 'Login Error'
          )
        );
      }
    );
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

export function logoutUser(dispatch) {
  return () => {
    dispatch(requestLogout());
    cookies.remove('id_token', { path: '/' });
    cookies.remove('role', { path: '/' });
    cookies.remove('access_right', { path: '/' });
    dispatch(receiveLogout());
    window.location.href = '/login';
  };
}
