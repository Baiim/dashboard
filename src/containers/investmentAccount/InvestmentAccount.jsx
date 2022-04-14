import {
  changeParams,
  fetchData,
  resetParams
} from '@actions/investmentAccount.action';
import { withRouter } from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import InvestmentAccountTable from './InvestmentAccountTable';

const InvestmentAccount = props => <InvestmentAccountTable {...props} />;

const mapStateToProps = state => ({ data: state.investmentAccount });

export default connect(mapStateToProps, {
  fetchData,
  changeParams,
  resetParams
})(withRouter(InvestmentAccount));
