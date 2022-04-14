import React, { Component } from 'react';
import TableWrapper from './TableWrapper';

const TableListingPage = tableProp => WrappedComponent =>
  class TableListingHOC extends Component {
    componentDidMount() {
      const { fetchData, data } = this.props;
      fetchData(data.params);
    }

    componentWillReceiveProps(nextProps) {
      const { data, fetchData } = this.props;
      if (data.params !== nextProps.data.params) {
        fetchData(nextProps.data.params);
      }
    }

    componentWillUnmount() {
      this.props.resetParams();
    }

    handleTableChange = (actionType, { sortField, sortOrder }) => {
      const { data, changeParams } = this.props;
      const changedParams = { sort: sortOrder, by: sortField };
      changeParams(data.params, changedParams);
    };

    handlePageChange = currPage => {
      const { data, changeParams } = this.props;
      const changedParams = { page: currPage };
      changeParams(data.params, changedParams);
    };

    render() {
      const { data, router, setDeleteModal } = this.props;

      const {
        name,
        columns,
        path,
        displayAction,
        actionEdit,
        actionView,
        actionDelete,
        hideCreate,
        noPagination
      } = tableProp;

      const column = columns(this.props);

      const actionColumn = [
        {
          dataField: 'id',
          text: 'Action',
          headerStyle: () => ({ width: '15%' }),
          formatter: id => (
            <>
              {actionView && (
                <a
                  href={`${router.route}/${id}/detail`}
                  className="btn btn-success text-sm mx-1"
                  style={{ padding: '3.5px 6px' }}
                >
                  <i className="fa fa-eye text-white" />
                </a>
              )}

              {actionEdit && (
                <a
                  href={`${router.route}/${id}/edit`}
                  className="btn btn-warning text-sm mx-1"
                  style={{ padding: '3.5px 6px' }}
                >
                  <i className="fa fa-pen text-white" />
                </a>
              )}

              {actionDelete && (
                <button
                  className="btn btn-danger text-sm mx-1"
                  style={{ padding: '3.5px 8px', backgroundColor: '#e9292a' }}
                  onClick={() => setDeleteModal(id, data.params)}
                >
                  <i className="fa fa-trash text-white" />
                </button>
              )}
            </>
          )
        }
      ];

      const finalColumn = displayAction ? column.concat(actionColumn) : column;

      return (
        <div className="wrapper-table">
          <TableWrapper
            dataProps={this.props}
            data={data}
            name={name}
            columns={finalColumn}
            path={path}
            hideCreate={hideCreate}
            page={data.pagination?.currentPage}
            sizePerPage={data.pagination?.recordPerPage}
            totalSize={data.pagination?.count}
            onTableChange={this.handleTableChange}
            customAction={
              <WrappedComponent {...this.props} state={this.state} />
            }
            onPageChange={this.handlePageChange}
            noPagination={noPagination}
          />
        </div>
      );
    }
  };

export default TableListingPage;
