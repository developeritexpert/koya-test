
import React, { useRef } from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import { gsap } from 'gsap/all';



export default function ButtonHeaderSubMenu ( { title, options, onLinkClick, active, onActivate } ) {
    const matchArray = ['/location-aerial', '/location-map', '/amenities-1', '/movies',  '/gallery-apartments', '/gallery-amenities','/apartments','/apartments-interiors', '/apartments-finishes','/gallery-renders','/galleries-lifestyle'];
    const match = useRouteMatch(matchArray);
    var selected = false;
    const containerRef = useRef(null);
    const btnRef = useRef(null);
    const subMenuRef = useRef(null);
   
    const isMenuOpen = active === title;

   
    React.useEffect(() => {
        const desktop = window.innerWidth >= 991;
        if (isMenuOpen) {
            subMenuRef.current.style.display = 'block';
            subMenuRef.current.style.top = '75%';
            subMenuRef.current.style.opacity = 0;
            gsap.to(subMenuRef.current, 0.3, { top: '80%', opacity: 1 } );
            if (desktop) {
                document.addEventListener('click', closeSubMenu);
            }
            if (containerRef.current) {
                containerRef.current.addEventListener('mouseleave', onMouseLeaveContainer);
            }
        } else {
            if (containerRef.current) {
                containerRef.current.removeEventListener('mouseleave', onMouseLeaveContainer);
            }
            if (desktop) {
                document.removeEventListener('click', closeSubMenu);
            }
            gsap.killTweensOf(subMenuRef.current);
            subMenuRef.current.style.display = 'none';
        }
    }, [isMenuOpen]);

   
    let lineBreake = 10; 
    options.forEach(opt => {
        if (opt?.path === match?.path) {
            selected = true;
        }
    });

   
    const onParentHover = () => {
        if (onActivate) {
            onActivate(title);
        }
    };

    const onParentClick = () => {
        if (onActivate) {
           
            onActivate(isMenuOpen ? null : title);
        }
    };

    const onMouseLeaveContainer = (event) => {
       
        if (onActivate) {
            onActivate(null);
        }
    }

    const closeSubMenu = (event) => {
        if (!isMenuOpen || !onActivate) {
            return;
        }
     
        if (event && containerRef.current && containerRef.current.contains(event.target)) {
            return;
        }
        onActivate(null);
    };

    return (
        <>
            <div ref={ containerRef }>
                <button
                    className={ selected ? 'header--nav__link-selected main--menu__link-wrapper' :'header--nav__link main--menu__link-wrapper' }
                    ref={ btnRef }
                    onMouseEnter={ onParentHover }
                    onClick={ onParentClick }
                >
                    <div className='main--menu__link'>
                        { title }
                    </div>
                </button>
                <div className='header--nav__sub-menu' ref={ subMenuRef }>
                    <ul>
                        {options.map((option, idx) => (
                            <li key={idx} className='sub--menu-item'>
                                <NavLink
                                    className={`header--nav__link-in-sub-menu ${lineBreake}`}
                                    activeClassName='header--nav__link-selected'
                                    to={option.path}
                                    onClick={() => {
                                        if (onActivate) onActivate(null);
                                        if (onLinkClick) onLinkClick();
                                    }}
                                >
                                    <span className='menu-hover-line'></span>
                                    {option.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div> 
        </>       
    );

}