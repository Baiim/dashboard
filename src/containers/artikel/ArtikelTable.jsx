import React, { Component } from 'react';
import moment from 'moment';
import TableListingPage from '@components/table/TableListingPage';
import { artikelStatus } from '@helpers/statusTranslator';
import { CellLimitedItems } from '@components/table/CellLimitedItems';

class ArtikelTable extends Component {
  static columns = ({ openModal }) => {
    const columns = [
      {
        dataField: 'title',
        text: 'Judul Artikel ',
        headerStyle: () => ({ width: '20%' }),
        sort: true
      },
      {
        dataField: 'date_publish',
        text: 'Tanggal',
        sort: true,
        headerStyle: () => ({ width: '12%' }),
        formatter: data =>
          moment(data)
            .locale('id')
            .format('ll')
      },
      {
        dataField: 'hashtag',
        text: 'Hashtag',
        formatter: data => (
          <CellLimitedItems
            items={data?.map(e => e.name)}
            onClickRemainingItems={() =>
              openModal({
                title: 'Hashtag',
                data
              })
            }
          />
        )
      },
      {
        dataField: 'stock',
        text: 'Saham Terkait',
        formatter: data => (
          <CellLimitedItems
            items={data?.map(e => e.name)}
            onClickRemainingItems={() =>
              openModal({
                title: 'Saham Terkait',
                data
              })
            }
          />
        )
      },
      {
        dataField: 'comment_count',
        text: 'Komentar',
        headerAlign: 'center',
        formatter: data => <div className="text-center">{data}</div>
      },
      {
        dataField: 'status',
        text: 'Status',
        headerStyle: () => ({ width: '12%' }),
        formatter: data =>
          data && (
            <div
              className="d-flex align-items-center font-weight-semibold"
              style={{ color: artikelStatus(data).color }}
            >
              <i className="fa fa-circle mr-2" style={{ fontSize: '0.5rem' }} />
              {artikelStatus(data).label}
            </div>
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
  name: 'Artikel',
  path: '/article',
  columns: ArtikelTable.columns,
  displayAction: true,
  actionView: true,
  actionEdit: true,
  actionDelete: true
})(ArtikelTable);
