import React from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isAuth } from '@helpers/token';
import { changeParams } from '@actions/user.action';
import HeadDefault from '@components/head/HeadDefault';
import MainLayout from '@components/layout/MainLayout';
import NavHeader from '@components/navbars/NavHeader';
import DaftarPengguna from '@containers/user/UserManagement';
import ArtikelTanggapan from '@containers/artikel/ArtikelTanggapan';

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
          <ArtikelTanggapan type="edit" Router={Router} />
        </MainLayout>
      </>
    );
  }
}

const mapStateToProps = state => ({
  current: state.admin,
  data: state.webinar
});

export default connect(mapStateToProps)(withRouter(Index));
