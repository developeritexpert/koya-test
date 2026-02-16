
import React, { useRef, useState } from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import { gsap } from 'gsap/all';


export default function ButtonHeaderSubMenu ( { title, options } ) {
    const matchArray = ['/location-aerial', '/location-map', '/amenities-1', '/movies',  '/gallery-apartments', '/gallery-amenities','/apartments','/apartments-interiors', '/apartments-finishes','/gallery-renders','/galleries-lifestyle'];
    const match = useRouteMatch(matchArray);
    var selected = false;
    const containerRef = useRef(null);
    const btnRef = useRef(null);
    const subMenuRef = useRef(null);
    let isMenuOpen = false;

    const optionsList = [];
    let option;
    let lineBreake = 10;
    // Not yet in use
    // let lineGallery;

    for (let i = 0; i < options.length; i++) { 
        
        option = options[i];

        if (option?.path === match?.path) {
            selected = true;
        }
        optionsList.push(
            <li key={i} className='sub--menu-item'>
                <NavLink 
                className={`header--nav__link-in-sub-menu ${lineBreake}`} activeClassName='header--nav__link-selected' 
                to={option.path}> 
                    <span className='menu-hover-line'></span>
                    { option.title }
                </NavLink>
            </li>
        );
        
    }

    const openSubMenu = async () => {
        if (!isMenuOpen) {
            isMenuOpen = true;
            subMenuRef.current.style.display = 'block';
            subMenuRef.current.style.top = '75%';
            subMenuRef.current.style.opacity = 0;
            gsap.to(subMenuRef.current, 0.3, { top: '80%', opacity: 1 } );
            document.addEventListener('click', closeSubMenu);
            if (containerRef.current) {
                containerRef.current.addEventListener('mouseleave', onMouseLeaveContainer);
            }
        }
    }

    const onMouseLeaveContainer = (event) => {
        closeSubMenu();
    }

    const closeSubMenu = (event) => {
        if (isMenuOpen) {
            isMenuOpen = false;
            if (containerRef.current) {
                containerRef.current.removeEventListener('mouseleave', onMouseLeaveContainer);
            }
            document.removeEventListener('click', closeSubMenu);
            gsap.killTweensOf(subMenuRef.current);
            subMenuRef.current.style.display = 'none';
        }
    }

    return (
        <>
            <div ref={ containerRef }>
                <button className={ selected ? 'header--nav__link-selected main--menu__link-wrapper' :'header--nav__link main--menu__link-wrapper' } ref={ btnRef } onMouseEnter={ () => setTimeout(openSubMenu, 0) } onClick={ openSubMenu }>
                    <div className='main--menu__link'>
                        { title }
                    </div>
                </button>
                <div className='header--nav__sub-menu' ref={ subMenuRef }>
                    <ul>
                        { optionsList }
                    </ul>
                </div> 
            </div> 
        </>       
    );

}