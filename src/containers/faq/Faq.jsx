import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
} from '@actions/faq.action';
import FaqTable from './FaqTable';

const Faq = props => (
  <div>
    <FaqTable {...props} />
  </div>
);

const mapStateToProps = state => ({ data: state.faq });

export default connect(mapStateToProps, {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
})(withRouter(Faq));
