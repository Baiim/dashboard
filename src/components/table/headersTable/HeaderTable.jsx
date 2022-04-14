import React, { Component } from 'react';
import Router from 'next/router';

class HeaderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, path, hideCreate } = this.props;

    return (
      <div className="d-flex align-items-center justify-content-between w-100 mb-4">
        <h4 className="font-weight-semibold mb-0">Daftar {name}</h4>
        {!hideCreate && (
          <button
            className="btn btn-danger font-weight-semibold br-8 px-4 py-2"
            onClick={() => Router.push(`${path}/add`)}
          >
            + Tambah {name}
          </button>
        )}
      </div>
    );
  }
}

export default HeaderTable;
