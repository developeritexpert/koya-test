import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ButtonHeaderSubMenu from './ButtonHeaderSubMenu';
import { dataRoutes } from '../../routes/dataRoutes';
import './stylesHeader.scss';

export default function ViewHeader() {
  const location = useLocation();

  // check if current route is active
  const isActive = (route) => {
    if (!route.routes) {
      // simple route
      return location.pathname === route.path;
    }
    // parent route: active if any child route matches
    return route.routes.some((r) => location.pathname.startsWith(r.path));
  };

  const getLinks = () => {
    const links = [];
    let currKeyIndex = 0;

    for (let i = 0; i < dataRoutes.length - 1; i++) { // skip home
      const currRoute = dataRoutes[i];
      if (!currRoute.title) continue;

      const active = isActive(currRoute);

      links.push(
        <li className="header--nav__li" key={currKeyIndex}>
          {currRoute.routes === undefined ? (
            <NavLink
              className={`header--nav__link main--menu__link-wrapper`}
              activeClassName="header--nav__link-selected"
              to={currRoute.path}
            >
              <div className="main--menu__link">{currRoute.title}</div>
            </NavLink>
          ) : (
            <ButtonHeaderSubMenu title={currRoute.title} options={currRoute.routes} parentActive={active} />
          )}
        </li>
      );

      currKeyIndex++;
    }

    return links;
  };

  return (
    <header className="header">
      <nav className="header--nav">
        <ul className="header--nav-ui">
          <li className="header--nav__li">
            <NavLink className="header--nav__link-logo" to="/">
              <img
                src="./img/interface/logo--koya-small.png"
                width="250"
                height="auto"
                alt="Koya Logo"
              />
            </NavLink>
          </li>
          {getLinks()}
        </ul>
      </nav>
    </header>
  );
}