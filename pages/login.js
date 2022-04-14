import React, { Component } from 'react';
import { isAuth } from '@helpers/token';
import Router from 'next/router';
import Login from '@containers/login/Login';

class Index extends Component {
  state = {};

  componentDidMount() {
    if (isAuth()) {
      Router.push('/daftar-pengguna');
    }
  }

  render() {
    return (
      <>
        <Login />
      </>
    );
  }
}

export default Index;
