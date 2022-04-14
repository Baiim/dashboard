import React from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isAuth } from '@helpers/token';
import HeadDefault from '@components/head/HeadDefault';
import MainLayout from '@components/layout/MainLayout';
import NavHeader from '@components/navbars/NavHeader';
import UserManagementForm from '@containers/user/UserManagementForm';

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
          <NavHeader {...this.props} />
          <UserManagementForm />
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
