import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone
} from 'react-bootstrap-table2-paginator';
import HeaderTable from '@components/table/headersTable/HeaderTable';
import DeleteModal from '@components/modals/DeleteModal';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const TableWrapper = props => {
  const {
    dataProps,
    data,
    name,
    columns,
    path,
    hideCreate,
    page,
    sizePerPage,
    onTableChange,
    onPageChange,
    totalSize,
    noPagination
  } = props;

  return (
    <>
      <HeaderTable name={name} path={path} hideCreate={hideCreate} />
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          page,
          paginationSize: 3,
          sizePerPage,
          totalSize,
          prePageText: <i className="fas fa-chevron-left" />,
          nextPageText: <i className="fas fa-chevron-right" />,
          alwaysShowAllBtns: true,
          withFirstAndLast: false
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <>
            <div className="table-responsive table-ui">
              <BootstrapTable
                bootstrap4
                remote
                striped
                keyField="id"
                data={data.data}
                columns={columns}
                bordered={false}
                loading={data.isLoading}
                onTableChange={onTableChange}
                noDataIndication={() => (
                  <div className="text-center">Data Kosong</div>
                )}
                overlay={overlayFactory({
                  spinner: true,
                  background: 'rgba(192,192,192,0.3)'
                })}
                {...paginationTableProps}
              />
              <DeleteModal {...dataProps} />
            </div>
            {!noPagination && totalSize > 0 && (
              <div className="d-flex align-items-center justify-content-between">
                <PaginationTotalStandalone {...paginationProps} />
                <PaginationListStandalone
                  {...paginationProps}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </>
        )}
      </PaginationProvider>
    </>
  );
};

export default TableWrapper;
