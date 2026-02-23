
import React from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import ButtonHeaderSubMenu from './ButtonHeaderSubMenu';
import { dataRoutes } from '../../routes/dataRoutes';
import './stylesHeader.scss';


export default function ViewHeader () {
    const getLinks = () => {
        const links = [];
        let currRoute;
        let currKeyIndex = 0;
        for (let i = 0; i < dataRoutes.length - 1; i++) { //skip home as it's used as the logo
            currRoute = dataRoutes[i];
            if (currRoute.title) { //if there's no title the link is assumed to be accessed elsewhere, outside the primary menu
                links.push(
                    <li className='header--nav__li' key={ currKeyIndex }>
                        {
                        currRoute.routes === undefined //whether it's a drop down or not
                        ? <NavLink className='header--nav__link main--menu__link-wrapper' activeClassName='header--nav__link-selected' to={ currRoute.path }>
                            <div className='main--menu__link'>
                                 {currRoute.title }
                            </div>
                        </NavLink>
                        : <ButtonHeaderSubMenu title={ currRoute.title } options={ currRoute.routes }/>
                        }
                    </li>

                );
                currKeyIndex++;
            }
        }
        return links;
    }

    return (
        <header className='header'>
            <nav className='header--nav'>
                <ul className='header--nav-ui'>
                    <li className='header--nav__li'>
                        <NavLink className='header--nav__link-logo' to='/'>
                            <img src='./img/interface/logo--koya-small.png' width='250' height='auto' alt='Koya Logo' />
                        </NavLink>
                    </li>
                    { getLinks() }
                </ul>
            </nav>
        </header>
    );

}