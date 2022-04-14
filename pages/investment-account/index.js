import React from 'react';
import { connect } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isAuth } from '@helpers/token';
import { changeParams } from '@actions/investmentAccount.action';
import HeadDefault from '@components/head/HeadDefault';
import MainLayout from '@components/layout/MainLayout';
import NavHeader from '@components/navbars/NavHeader';
import InvestmentAccount from '@containers/investmentAccount/InvestmentAccount';

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
        <HeadDefault title="Saham Rakyat | Akun Investasi" description="" />
        <MainLayout dispatch={dispatch} app={app}>
          <NavHeader
            placeholder="Cari akun investasi"
            changeParams={changeParams}
            {...this.props}
          />
          <InvestmentAccount />
        </MainLayout>
      </>
    );
  }
}

// const mapStateToProps = state => ({ current: state.admin, data: state.member });
const mapStateToProps = state => ({
  current: state.admin,
  data: state.investmentAccount
});

export default connect(mapStateToProps)(withRouter(Index));
