import React, { Component } from 'react';
import TableListingPage from '@components/table/TableListingPage';
import { limitString } from '@helpers/normalizeData';

class FaqTable extends Component {
  static columns = () => {
    const columns = [
      {
        dataField: 'question',
        text: 'Pertanyaan',
        formatter: data => <div> {limitString(data, 20)} </div>
      },
      {
        dataField: 'answer',
        text: 'Jawaban',
        formatter: data => <div> {limitString(data, 20)} </div>
      }
    ];

    return columns;
  };

  render() {
    return <div />;
  }
}

export default TableListingPage({
  name: 'FAQ',
  path: '/faq',
  columns: FaqTable.columns,
  displayAction: true,
  actionEdit: true,
  actionDelete: true
})(FaqTable);
