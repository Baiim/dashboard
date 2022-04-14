import React, { Component } from 'react';
import TableListingPage from '@components/table/TableListingPage';
import { formatterNumber } from '@helpers/price';

class DaftarTransaksiTable extends Component {
  static columns = ({ router }) => {
    const columns = [
      {
        dataField: 'name',
        text: 'Nama Group',
        formatter: (cell, row) => (
          <a href={`${router.route}/${row.id}/detail`}>{cell}</a>
        )
      },
      {
        dataField: 'image_url',
        text: 'Avatar',
        formatter: cell => (
          <div>
            {cell ? (
              <img src={cell} alt="" className="image-column" />
            ) : (
              'No Image'
            )}
          </div>
        )
      },
      {
        dataField: 'description',
        text: 'Deskripsi'
      },
      {
        dataField: 'detail_prices',
        text: 'Harga/periode',
        formatter: cell => (
          <div>
            {' '}
            {cell.map((data, index) => (
              <>
                <span>
                  {' '}
                  Rp {formatterNumber(data.price)}
                  {' / '}
                  {index < 3 ? `${index + 1} Bulan` : '1 Tahun'}{' '}
                </span>{' '}
                <br />{' '}
              </>
            ))}{' '}
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
  name: 'Group Chat',
  path: '/group-chat',
  columns: DaftarTransaksiTable.columns,
  displayAction: true,
  actionView: true,
  actionEdit: true,
  actionDelete: true
})(DaftarTransaksiTable);
