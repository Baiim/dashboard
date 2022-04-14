import React from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isAuth } from '@helpers/token';
import { changeParams } from '@actions/stock.action';
import HeadDefault from '@components/head/HeadDefault';
import MainLayout from '@components/layout/MainLayout';
import NavHeader from '@components/navbars/NavHeader';
import Stock from '@containers/stock/Stock';

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
        <HeadDefault title="Saham Rakyat | Saham" description="" />
        <MainLayout dispatch={dispatch} app={app}>
          <NavHeader
            placeholder="Cari saham"
            changeParams={changeParams}
            {...this.props}
          />
          <Stock />
        </MainLayout>
      </>
    );
  }
}

const mapStateToProps = state => ({
  current: state.admin,
  data: state.hashtag
});

export default connect(mapStateToProps)(withRouter(Index));
