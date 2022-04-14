import React from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isAuth } from '@helpers/token';
import HeadDefault from '@components/head/HeadDefault';
import MainLayout from '@components/layout/MainLayout';
import NavHeader from '@components/navbars/NavHeader';
import GroupChat from '@containers/groupChat/GroupChat';
import { changeParams } from '@actions/groupChat.action';

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
        <HeadDefault title="Saham Rakyat | Group Chat" description="" />

        <MainLayout dispatch={dispatch} app={app}>
          <NavHeader
            placeholder="Cari group chat"
            changeParams={changeParams}
            {...this.props}
          />
          <GroupChat />
        </MainLayout>
      </>
    );
  }
}

const mapStateToProps = state => ({
  current: state.admin,
  data: state.groupChat
});

export default connect(mapStateToProps)(withRouter(Index));
