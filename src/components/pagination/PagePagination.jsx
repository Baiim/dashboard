import React, { Component } from 'react';
import Pagination from 'react-js-pagination';

class PagePagination extends Component {
  state = {};

  render() {
    const { data, setPagination } = this.props;

    return (
      <Pagination
        hideFirstLastPages
        prevPageText="<"
        nextPageText=">"
        activePage={data.pagination.currentPage}
        itemsCountPerPage={data.pagination.recordPerPage}
        totalItemsCount={data.pagination.count}
        pageRangeDisplayed={3}
        onChange={page => setPagination(page)}
      />
    );
  }
}

export default PagePagination;
