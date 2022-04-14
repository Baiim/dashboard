import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
} from '@actions/groupChat.action';
import GroupChatTable from './GroupChatTable';

const Table = props => <GroupChatTable {...props} />;

const mapStateToProps = state => ({ data: state.groupChat });

export default connect(mapStateToProps, {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
})(withRouter(Table));
