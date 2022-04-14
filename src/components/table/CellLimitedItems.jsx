import React from 'react';

export const CellLimitedItems = ({ items = [], onClickRemainingItems }) => {
  const slicedItems = items?.slice(0, 2);
  const remainingItems = items?.length > 2 ? items?.length - 2 : '';

  const handleOnClickRemainingItems = () => {
    onClickRemainingItems && onClickRemainingItems();
  };

  return (
    <div className="d-flex align-items-center">
      <div>
        {slicedItems?.map(item => (
          <div>{item}</div>
        ))}
      </div>

      {remainingItems && (
        <div onClick={handleOnClickRemainingItems} className="ellipse ml-3">
          +{remainingItems}
        </div>
      )}
    </div>
  );
};
