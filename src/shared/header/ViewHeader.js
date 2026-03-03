import React, { useState } from "react";
import { NavLink, useRouteMatch, useLocation } from "react-router-dom";
import ButtonHeaderSubMenu from "./ButtonHeaderSubMenu";
import { dataRoutes } from "../../routes/dataRoutes";
import "./stylesHeader.scss";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";


export default function ViewHeader() {
  const [toggle, setToggle] = useState(false);
   
    const [activeSubmenu, setActiveSubmenu] = useState(null);

  const getLinks = () => {
    const links = [];
    let currRoute;
    let currKeyIndex = 0;
    for (let i = 0; i < dataRoutes.length - 1; i++) {
      currRoute = dataRoutes[i];
      if (currRoute.title) {
       
        links.push(
          <li className="header--nav__li" key={currKeyIndex}>
            {currRoute.routes === undefined ? ( 
              <NavLink
                className="header--nav__link main--menu__link-wrapper"
                activeClassName="header--nav__link-selected"
                to={currRoute.path}
                  onClick={() => setToggle(false)}
              >
                <div className="main--menu__link">{currRoute.title}</div>
              </NavLink>
            ) : (
              <ButtonHeaderSubMenu
                title={currRoute.title}
                options={currRoute.routes}
               
                onLinkClick={() => setToggle(false)}
                active={activeSubmenu}
                onActivate={(name) => setActiveSubmenu(name)}
              />
            )}
          </li>,
        );
        currKeyIndex++;
      }
    }
    return links;
  };

  return (
    <>
        <header className="header">
     <nav>
         <NavLink className="header--nav__link-logo" to="/">
        <img
          src="./img/interface/logo--koya-small.png"
          width="250"
          height="auto"
          alt="Koya Logo"
        />
      </NavLink>
      <ul className="header--nav-ui">
        <li className="header--nav__li"></li>
        {getLinks()}
      </ul>
      <button onClick={() => setToggle(!toggle)} className="mobile-nav-toogler">
       {toggle?(<MdClose />
):(<IoMdMenu />)} 
      </button>
     </nav>

    
    </header>
     
      <ul className={`moble-header ${toggle ? "open" : ""}`}>{getLinks()}</ul>
    </>
  );
}
