import {
  changeParams,
  closeHashtagModal,
  deleteData,
  fetchData,
  openHashtagModal,
  resetParams,
  setDeleteModal
} from '@actions/hashtag.action';
import { withRouter } from 'next/router';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { HashtagModal } from './HashtagModal';
import HashtagTable from './HashtagTable';

const Hashtag = props => {
  const dispatch = useDispatch();

  const openModal = data => {
    dispatch(openHashtagModal(data));
  };

  const toggleCloseModal = () => {
    dispatch(closeHashtagModal());
  };

  return (
    <>
      <HashtagModal isOpen={props.data.isOpenModal} toggle={toggleCloseModal} />
      <HashtagTable {...props} openModal={openModal} />
    </>
  );
};

const mapStateToProps = state => ({ data: state.hashtag });

export default connect(mapStateToProps, {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
})(withRouter(Hashtag));
