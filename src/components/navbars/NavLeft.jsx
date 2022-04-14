/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { ListGroup, ListGroupItem, Collapse } from 'reactstrap';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { MENUS } from '@constants/menus';
import { setSidebarToggle } from '@actions/app.action';
import { useDispatch, useSelector } from 'react-redux';

const ListGroupItemRef = React.forwardRef(props => (
  <ListGroupItem {...props} />
));

const NavLeft = props => {
  const { router } = props;
  const dispatch = useDispatch();
  const sidebar = useSelector(state => state.app.sidebar);
  const toggleSidebar = name => dispatch(setSidebarToggle(name));
  const activeRoute = routeName => router.pathname.indexOf(routeName) > -1;

  return (
    <>
      <div className="wrapper-list-group">
        <div className="mb-4 ml-3 py-2 d-flex">
          <img src="/images/saham-rakyat-1.png" alt="Saham Rakyat" />
        </div>
        <ListGroup flush className="list-group-nav-left" tag="div">
          {MENUS.map(menu => (
            <>
              <Link
                passHref={!menu.childs}
                href={menu.childs ? '#' : menu.href}
                key={menu.name}
              >
                <button
                  onClick={() => {
                    if (menu.childs) {
                      toggleSidebar(
                        sidebar.name === menu.name ? null : menu.name
                      );
                    }
                  }}
                >
                  <ListGroupItemRef
                    active={activeRoute(menu.href)}
                    tag="a"
                    href="#"
                    className="font-weight-semibold"
                  >
                    <i className={menu.icon} />
                    {menu.label}
                    {menu.childs && (
                      <i
                        className={`float-right mt-1 ${
                          sidebar.name === menu.name
                            ? 'fas fa-angle-down'
                            : 'fas fa-angle-right'
                        }`}
                      />
                    )}
                  </ListGroupItemRef>
                </button>
              </Link>
              <Collapse isOpen={sidebar.name === menu.name}>
                {menu.childs &&
                  menu.childs.map(child => (
                    <Link passHref href={child.href} key={child.name}>
                      <ListGroupItemRef
                        active={activeRoute(child.href)}
                        tag="a"
                        href="#"
                        className="font-weight-semibold child"
                      >
                        {child.label}
                      </ListGroupItemRef>
                    </Link>
                  ))}
              </Collapse>
            </>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default withRouter(NavLeft);
