import React from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isAuth } from '@helpers/token';
import HeadDefault from '@components/head/HeadDefault';
import MainLayout from '@components/layout/MainLayout';
import NavHeader from '@components/navbars/NavHeader';
import GroupChaForm from '@containers/groupChat/GroupChatForm';

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
        <HeadDefault title="Saham Rakyat | Detail Transaksi" description="" />
        <MainLayout dispatch={dispatch} app={app}>
          <NavHeader {...this.props} />
          <GroupChaForm {...this.props} Router={Router} />
        </MainLayout>
      </>
    );
  }
}

export default connect(state => ({ current: state.admin }))(withRouter(Index));
