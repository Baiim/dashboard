/* eslint-disable no-param-reassign */
import Axios from 'axios';
import Router from 'next/router';
import Swal from 'sweetalert2';
import authUsecase from '../usecases/auth.usecase';

const httpService = Axios.create({
  baseURL: 'https://reqres.in/',
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
});

httpService.interceptors.request.use(
  config => {
    const user = authUsecase.getActiveUser();

    if (user) {
      config.headers.Authorization = user.token;
    }

    return config;
  },
  error => Promise.reject(error)
);

httpService.interceptors.response.use(
  config => config,
  async error => {
    if (error.response.status === 401) {
      await Swal.fire('Your Token is Expired', 'Please login again', 'info');
      Router.replace('/auth/login');
    } else if (error.response.status >= 500) {
      // something error with server
      await Swal.fire('Something error with Server', 'Server error', 'error');
    } else {
      // another something error
    }
    return Promise.reject(error);
  }
);

export default httpService;
