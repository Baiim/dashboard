import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
} from '@actions/article.action';
import ArtikelTable from './ArtikelTable';
import { ArtikelModal } from './ArtikelModal';

const Article = props => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', data: [] });

  const openModal = data => {
    setOpen(true);
    setModalData(data);
  };

  return (
    <>
      <ArtikelModal
        title={modalData.title}
        data={modalData.data}
        isOpen={open}
        toggle={() => setOpen(false)}
      />
      <ArtikelTable {...props} openModal={openModal} />
    </>
  );
};

const mapStateToProps = state => ({ data: state.article });

export default connect(mapStateToProps, {
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
})(withRouter(Article));
