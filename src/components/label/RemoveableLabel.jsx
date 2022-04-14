/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

export const RemoveableLabel = ({ text, removable, onRemove }) => {
  const handleRemoveButton = () => {
    onRemove && onRemove();
  };

  return (
    <div
      className="mr-2 mb-2"
      style={{
        padding: '8px 11px',
        background: '#E5EFF7',
        border: 1,
        display: 'inline-block',
        borderRadius: 5
      }}
    >
      {text}{' '}
      {removable && (
        <i
          className="fa fa-times fa-lg ml-2 text-danger"
          style={{ cursor: 'pointer' }}
          onClick={handleRemoveButton}
        />
      )}
    </div>
  );
};
