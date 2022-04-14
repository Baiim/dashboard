import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
} from '@actions/webinar.action';
import WebinarTable from './WebinarTable';

const Webinar = props => <WebinarTable {...props} />;

const mapStateToProps = state => ({ data: state.webinar });

export default connect(mapStateToProps, {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
})(withRouter(Webinar));
