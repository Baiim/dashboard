import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
} from '@actions/user.action';
import DaftarPenggunaTable from './UserManagementTable';

const DaftarPengguna = props => <DaftarPenggunaTable {...props} />;

const mapStateToProps = state => ({ data: state.user });

export default connect(mapStateToProps, {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
})(withRouter(DaftarPengguna));
