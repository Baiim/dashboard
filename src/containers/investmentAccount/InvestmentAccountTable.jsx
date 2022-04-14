import React, { Component } from 'react';
import TableListingPage from '@components/table/TableListingPage';
import { memberStatus } from '@helpers/statusTranslator';

class InvestmentAccountTable extends Component {
  static columns = () => {
    const columns = [
      {
        dataField: 'code',
        text: 'Client Code',
        formatter: data => <div className="ellipsis">{data}</div>
      },
      {
        dataField: 'name',
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
        text: 'Status',
        headerStyle: () => ({ width: '18%' }),
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
        dataField: 'username',
        text: 'Username',
        formatter: data => <div className="ellipsis">{data}</div>
      }
    ];

    return columns;
  };

  render() {
    return <div />;
  }
}

export default TableListingPage({
  name: 'Akun Investasi',
  path: '/investment-account',
  columns: InvestmentAccountTable.columns,
  hideCreate: true
})(InvestmentAccountTable);
