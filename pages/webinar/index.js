import React from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isAuth } from '@helpers/token';
import { changeParams } from '@actions/webinar.action';
import HeadDefault from '@components/head/HeadDefault';
import MainLayout from '@components/layout/MainLayout';
import NavHeader from '@components/navbars/NavHeader';
import Webinar from '@containers/webinar/Webinar';

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
        <HeadDefault title="Saham Rakyat | Webinar" description="" />
        <MainLayout dispatch={dispatch} app={app}>
          <NavHeader
            placeholder="Cari webinar"
            changeParams={changeParams}
            {...this.props}
          />
          <Webinar />
        </MainLayout>
      </>
    );
  }
}

const mapStateToProps = state => ({ current: state.admin, data: state.user });

export default connect(mapStateToProps)(withRouter(Index));