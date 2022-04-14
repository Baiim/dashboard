import React from 'react';

const TableAction = ({ onClick, actionType }) => {
  // const getIcon = () => {
  let icon = '';
  let btnBG = '';

  switch (actionType) {
    case 'edit':
      icon = 'fas fa-pencil-alt';
      btnBG = 'btn-primary';
      break;

    case 'view':
      icon = 'fas fa-eye';
      btnBG = 'btn-orange';
      break;

    case 'delete':
      icon = 'fas fa-trash';
      btnBG = 'btn-danger';
      break;

    case 'approve':
      icon = 'fas fa-check';
      btnBG = 'btn-success';
      break;

    case 'reject':
      icon = 'fas fa-times';
      btnBG = 'btn-danger';
      break;

    default:
      break;
  }
  // };
  return (
    <button
      className={`btn ${btnBG} btn-xs p-0 mx-1`}
      onClick={() => onClick()}
      title="Approve"
    >
      <i className={icon} style={{ fontSize: 12, padding: 5 }} />
    </button>
  );
};

export default TableAction;
