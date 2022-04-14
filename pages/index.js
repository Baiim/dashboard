import React, { Component } from 'react';
import { isAuth } from '@helpers/token';
import Router from 'next/router';

class Index extends Component {
  state = {};

  componentDidMount() {
    if (isAuth()) {
      Router.push('/user-management');
    }
  }

  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <h1 className="xeny-green">Selamat Datang</h1>
      </div>
    );
  }
}

export default Index;
