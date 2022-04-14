import React, { Component } from 'react';
import { get } from 'lodash';
import debounce from 'lodash/debounce';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import { fetchDataByToken } from '@actions/admin.action';
import { logoutUser } from '@actions/auth.action';

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { isDropdownOpen: false };
    this.handleSearch = debounce(this.handleSearch, 2000);
  }

  componentDidMount() {
    this.props.dispatch(fetchDataByToken());
  }

  handleSearch = value => {
    const { dispatch, params, changeParams, data } = this.props;
    const newParams = {};
    newParams[params || 'search'] = value;
    dispatch(changeParams(data.params, newParams));
  };

  handleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpen: !prevState.isDropdownOpen
    }));
  };

  render() {
    const { isDropdownOpen } = this.state;
    const { dispatch, current, placeholder } = this.props;
    const data = get(current, 'dataCurrent', {});

    return (
      <div
        className={`nav-header ${
          placeholder ? 'justify-content-between' : 'justify-content-end'
        } border-bottom`}
      >
        {placeholder && (
          <InputGroup className="input-search">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <img src="/images/icon/search.png" alt="" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              name="search"
              placeholder={placeholder}
              onChange={e => this.handleSearch(e.target.value)}
            />
          </InputGroup>
        )}
        {/* <button
            type="button"
            className="btn bg-transparent w-auto p-0"
            // onClick={() => Router.push(link)}
          >
            <i className="fas fa-bars" />
          </button> */}

        <Dropdown
          isOpen={isDropdownOpen}
          toggle={this.handleDropdown}
          className="h-auto"
        >
          <DropdownToggle className="btn bg-transparent border-0 py-0">
            <div className="d-flex align-items-center text-gray">
              <img src="/images/profile.png" alt="" width="32" />
              <p className="mx-2 mb-0 text-gray">
                {data ? data.name : 'Admin'}
              </p>
              <i className="fas fa-chevron-down mt-1" />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => dispatch(logoutUser(dispatch))}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default NavHeader;
