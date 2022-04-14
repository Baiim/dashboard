import React, { Component } from 'react';
import TableListingPage from '@components/table/TableListingPage';
import { memberStatus } from '@helpers/statusTranslator';
import moment from 'moment';

class MemberTable extends Component {
  static columns = () => {
    const columns = [
      {
        dataField: 'account_opening',
        text: 'Client Code',
        formatter: data => <div className="ellipsis">{data.client_code}</div>
      },
      {
        dataField: 'name',
        text: 'Nama',
        formatter: data => <div className="ellipsis">{data}</div>
      },
      {
        dataField: 'username',
        text: 'Nama User',
        formatter: data => <div className="ellipsis">{data}</div>
      },
      {
        dataField: 'email',
        text: 'Email',
        formatter: data => <div className="ellipsis">{data}</div>
      },
      {
        dataField: 'phone',
        text: 'No Telp',
        formatter: data => <div className="ellipsis">{data}</div>
      },
      {
        dataField: 'status',
        text: 'Status Akun Saham Rakyat',
        formatter: data => (
          <div
            className="d-flex align-items-center font-weight-semibold"
            style={{ color: memberStatus(data).color }}
          >
            <i className="fa fa-circle mr-2" style={{ fontSize: '0.5rem' }} />
            {memberStatus(data).label}
          </div>
        )
      },
      {
        dataField: 'account_opening',
        text: 'Status Akun Investasi',
        formatter: data => <div className="ellipsis">{data.status}</div>
      },
      {
        dataField: 'created_at',
        text: 'Tanggal Akun Investasi',
        formatter: data => (
          <div className="ellipsis">
            {moment(data).format('dddd, DD MMMM YYYY - HH:mm:ss')}
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
  name: 'Member',
  path: '/member',
  columns: MemberTable.columns,
  displayAction: true,
  actionView: true,
  actionDelete: true,
  hideCreate: true
})(MemberTable);
