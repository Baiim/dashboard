import React, { Component } from 'react';
import TableListingPage from '@components/table/TableListingPage';
import { userStatus } from '@helpers/statusTranslator';
import { limitString } from '@helpers/normalizeData';

class DaftarPenggunaTable extends Component {
  static columns = () => {
    const columns = [
      {
        dataField: 'name',
        text: 'Username',
        formatter: data => <div> {limitString(data, 24)} </div>
      },
      {
        dataField: 'email',
        text: 'Email',
        formatter: data => <div> {limitString(data, 24)} </div>
      },
      {
        dataField: 'role_code',
        text: 'Role',
        formatter: data => <div> {limitString(data, 24)} </div>
      },
      {
        dataField: 'status',
        text: 'Status',
        headerStyle: () => ({ width: '18%' }),
        formatter: data => (
          <div
            className={`pl-0 w-100 font-weight-semibold card-faq ${
              userStatus(data).color
            }`}
          >
            <i className="fa fa-circle mr-2" />
            {userStatus(data).label}
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
  name: 'User Management',
  path: '/user-management',
  columns: DaftarPenggunaTable.columns,
  displayAction: true,
  actionEdit: true,
  actionDelete: true
})(DaftarPenggunaTable);
