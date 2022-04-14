import { CellLimitedItems } from '@components/table/CellLimitedItems';
import TableListingPage from '@components/table/TableListingPage';
import React, { Component } from 'react';
import {
  OPEN_RELATED_HASHTAGS_MODAL,
  OPEN_STOK_DETAIL_MODAL
} from '../../store/actions/stock.action';

class StockTable extends Component {
  static columns = ({ openModal }) => {
    const columns = [
      {
        dataField: 'file',
        text: 'Logo',
        headerStyle: () => ({ width: '100px' }),
        headerAlign: 'center',
        dataAlign: 'center',
        formatter: data => (
          <div className="text-center">
            {data ? (
              <img
                src={data.url}
                alt=""
                width={50}
                height={50}
                className="rounded-circle"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              'No Image'
            )}
          </div>
        )
      },
      {
        dataField: 'name',
        text: 'Kode Emitten',
        headerStyle: () => ({ width: '12%' }),
        headerAlign: 'center',
        formatter: data => <div className="ellipsis text-center">{data}</div>
      },
      {
        dataField: 'company_name',
        text: 'Nama Saham',
        formatter: data => <div className="ellipsis">{data}</div>
      },
      {
        dataField: 'stock_sector',
        text: 'Sector',
        formatter: (data, row) => {
          const sectors = data.map(item => item.name);
          return (
            <CellLimitedItems
              onClickRemainingItems={() =>
                openModal(OPEN_RELATED_HASHTAGS_MODAL, row)
              }
              items={sectors}
            />
          );
        }
      },
      {
        dataField: 'stock_category',
        text: 'Hashtags',
        formatter: (data, row) => {
          const hashtags = data ? data.map(item => item.name) : [];
          return (
            <CellLimitedItems
              onClickRemainingItems={() =>
                openModal(OPEN_RELATED_HASHTAGS_MODAL, row)
              }
              items={hashtags}
            />
          );
        }
      },
      {
        dataField: 'price',
        headerAlign: 'center',
        text: 'Current Price',
        formatter: data => (
          <div className="ellipsis text-center">{data.price}</div>
        )
      },
      {
        text: 'Action',
        formatter: (data, row) => (
          <button
            className="btn btn-warning text-sm mx-1"
            style={{ padding: '3.5px 8px' }}
            onClick={() => openModal(OPEN_STOK_DETAIL_MODAL, row)}
          >
            <i className="fa fa-pen text-white" />
          </button>
        )
      }
    ];

    return columns;
  };

  render() {
    return <div />;
  }
}

export default TableListingPage({
  name: 'Saham',
  path: '/stock',
  columns: StockTable.columns,
  displayAction: false,
  actionView: true,
  actionDelete: true,
  hideCreate: true
})(StockTable);
