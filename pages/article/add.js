import React from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isAuth } from '@helpers/token';
import HeadDefault from '@components/head/HeadDefault';
import MainLayout from '@components/layout/MainLayout';
import NavHeader from '@components/navbars/NavHeader';
import ArtikelForm from '@containers/artikel/ArtikelForm';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (process.browser) {
      if (!isAuth()) {
        Router.push('/');
      }
    }
  }

  render() {
    const { dispatch, app } = this.props;
    return (
      <>
        <HeadDefault title="Saham Rakyat | Artikel" description="" />
        <MainLayout dispatch={dispatch} app={app}>
          <NavHeader {...this.props} />
          <ArtikelForm {...this.props} />
        </MainLayout>
      </>
    );
  }
}

export default connect(state => ({ current: state.admin }))(withRouter(Index));
