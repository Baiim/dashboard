import {
  changeParams,
  closeStockModal,
  deleteData,
  fetchData,
  openStockModal,
  resetParams,
  setDeleteModal
} from '@actions/stock.action';
import { fetchData as fetchHashtagData } from '@actions/hashtag.action';
import { withRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RelatedHashtagsModal } from './RelatedHashtagsModal';
import { StockDetailModal } from './StockDetailModal';
import StockTable from './StockTable';

const Stock = props => {
  const dispatch = useDispatch();

  const openModal = (modalType, stock) => {
    dispatch(openStockModal(modalType, stock));
  };

  const toggleCloseModal = () => {
    dispatch(closeStockModal());
  };

  useEffect(() => {
    dispatch(fetchHashtagData());
  }, []);

  return (
    <>
      <RelatedHashtagsModal
        isOpen={props.data.isRelatedHashtagsModalOpen}
        toggle={toggleCloseModal}
      />
      <StockDetailModal
        isOpen={props.data.isStockDetailModalOpen}
        toggle={toggleCloseModal}
      />
      <StockTable {...props} openModal={openModal} />
    </>
  );
};

const mapStateToProps = state => ({
  data: state.stock
});

export default connect(mapStateToProps, {
  fetchHashtagData,
  fetchData,
  changeParams,
  resetParams,
  setDeleteModal,
  deleteData
})(withRouter(Stock));
