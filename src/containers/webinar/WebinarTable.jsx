import React, { Component } from 'react';
import TableListingPage from '@components/table/TableListingPage';
import { limitString } from '@helpers/normalizeData';
import { formatterNumber } from '@helpers/price';
import moment from 'moment';

class WebinarTable extends Component {
  static columns = () => {
    const columns = [
      {
        dataField: 'title',
        text: 'Judul',
        formatter: data => limitString(data, 24)
      },
      {
        dataField: 'image_path',
        text: 'Banner',
        formatter: cell =>
          cell ? (
            <img src={cell} alt="Webinar" className="image-column" />
          ) : (
            'No Image'
          )
      },
      {
        dataField: 'speaker',
        text: 'Pembicara',
        formatter: data => limitString(data, 24)
      },
      {
        dataField: 'link',
        text: 'Link',
        formatter: data => limitString(data, 10)
      },
      {
        dataField: 'meeting_id',
        text: 'Meeting ID',
        formatter: data => limitString(data, 15)
      },
      {
        dataField: 'passcode',
        text: 'Password Webinar',
        formatter: data => limitString(data, 15)
      },
      {
        dataField: 'date',
        text: 'Tanggal & Waktu Pelaksanaan',
        formatter: data =>
          data &&
          `${moment(data).format('YYYY-MM-DD')} ${moment(data).format('HH:mm')}`
      },
      {
        dataField: 'cost',
        text: 'Biaya',
        formatter: data => (data ? `Rp ${formatterNumber(data)}` : 'Rp 0')
      }
    ];

    return columns;
  };

  render() {
    return <div />;
  }
}

export default TableListingPage({
  name: 'Webinar',
  path: '/webinar',
  columns: WebinarTable.columns,
  displayAction: true,
  actionEdit: true,
  actionDelete: true
})(WebinarTable);
