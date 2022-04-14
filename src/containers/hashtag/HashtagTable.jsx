import { CellLimitedItems } from '@components/table/CellLimitedItems';
import TableListingPage from '@components/table/TableListingPage';
import React, { Component } from 'react';

class StockTable extends Component {
  static columns = ({ openModal }) => {
    const columns = [
      {
        dataField: 'name',
        text: 'Hashtags',
        formatter: data => <div className="ellipsis">{data}</div>
      },
      {
        dataField: 'relatedHashtags',
        text: 'Related Hashtags',
        formatter: data => (
          <CellLimitedItems
            onClickRemainingItems={() =>
              openModal({
                title: 'Related Hashtags',
                items: data
              })
            }
            items={data}
          />
        )
      },
      {
        dataField: 'sector_name',
        text: 'Sector',
        formatter: data => (
          <CellLimitedItems
            onClickRemainingItems={() =>
              openModal({
                title: 'Sector',
                items: data
              })
            }
            items={data?.map(item => item.name)}
          />
        )
      },
      {
        dataField: 'stock_name',
        text: 'Saham',
        headerStyle: () => ({ width: '12%' }),
        formatter: data => (
          <CellLimitedItems
            onClickRemainingItems={() =>
              openModal({
                title: 'Saham',
                items: data
              })
            }
            items={data?.map(item => item.name)}
          />
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
  name: 'Hashtags',
  path: '/hashtag',
  columns: StockTable.columns,
  displayAction: true,
  actionDelete: true,
  actionEdit: true,
  hideCreate: false
})(StockTable);
