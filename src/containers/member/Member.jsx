import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
} from '@actions/member.action';
import MemberTable from './MemberTable';

const Member = props => <MemberTable {...props} />;

const mapStateToProps = state => ({ data: state.member });

export default connect(mapStateToProps, {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
})(withRouter(Member));
