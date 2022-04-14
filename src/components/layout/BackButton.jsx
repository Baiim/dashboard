import React from 'react';
import Router from 'next/router';

export const BackButton = ({ link }) => (
  <button
    type="button"
    className="btn bg-transparent p-0 m-0"
    onClick={() => Router.push(link)}
  >
    <div className="d-flex align-items-center text-primary mb-4">
      <i className="fas fa-arrow-left" />
      <span className="font-weight-semibold ml-2">Kembali</span>
    </div>
  </button>
);
