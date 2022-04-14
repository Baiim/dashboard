import React from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isAuth } from '@helpers/token';
import { changeParams } from '@actions/user.action';
import HeadDefault from '@components/head/HeadDefault';
import MainLayout from '@components/layout/MainLayout';
import NavHeader from '@components/navbars/NavHeader';
import DaftarPengguna from '@containers/user/UserManagement';

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
        <HeadDefault title="Saham Rakyat | User Management" description="" />
        <MainLayout dispatch={dispatch} app={app}>
          <NavHeader
            placeholder="Cari user"
            changeParams={changeParams}
            {...this.props}
          />
          <DaftarPengguna />
        </MainLayout>
      </>
    );
  }
}

const mapStateToProps = state => ({
  current: state.admin,
  data: state.user
});

export default connect(mapStateToProps)(withRouter(Index));
