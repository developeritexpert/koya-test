import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import { gsap } from 'gsap/all';

export default function ButtonHeaderSubMenu({ title, options }) {

    const matchArray = ['/location-aerial', '/location-map', '/amenities-1', '/movies', '/gallery-apartments', '/gallery-amenities', '/apartments', '/apartments-interiors', '/apartments-finishes', '/gallery-renders', '/galleries-lifestyle'];
    const match = useRouteMatch(matchArray);
    const location = useLocation();

    var selected = false;
    const containerRef = useRef(null);
    const btnRef = useRef(null);
    const subMenuRef = useRef(null);
    let isMenuOpen = false;

    const [lastTapped, setLastTapped] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTouchDevice(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0
            );
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isTouchDevice) return;
        const handleOutsideTap = () => setLastTapped(false);
        document.addEventListener('pointerdown', handleOutsideTap);
        return () => document.removeEventListener('pointerdown', handleOutsideTap);
    }, [isTouchDevice]);

    const optionsList = [];
    let option;
    let lineBreake = 10;

    for (let i = 0; i < options.length; i++) {
        option = options[i];

        if (location.pathname === option?.path) {
            selected = true;
        }

        optionsList.push(
            <li key={i} className='sub--menu-item'>
                <NavLink
                    className={`header--nav__link-in-sub-menu ${lineBreake}`}
                    activeClassName='header--nav__link-selected'
                    to={option.path}>
                    <span className="header--nav__link-in-sub-menu-inner">
                        <span className='menu-hover-line'></span>
                        {option.title}
                    </span>
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
            gsap.to(subMenuRef.current, 0.3, { top: '80%', opacity: 1 });
            document.addEventListener('click', closeSubMenu);

            if (containerRef.current) {
                containerRef.current.addEventListener('mouseleave', onMouseLeaveContainer);
            }
        }
    }

    const onMouseLeaveContainer = () => {
        closeSubMenu();
    }

    const closeSubMenu = () => {
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

    const handlePointerDown = (e) => {
        if (!isTouchDevice) return;

        e.stopPropagation();

        if (!lastTapped) {
            setLastTapped(true);
            openSubMenu();
        } else {
            setLastTapped(false);
            closeSubMenu();
        }
    }

    return (
        <>
            <div ref={containerRef}>
                <button
                    className={selected ? 'header--nav__link-selected main--menu__link-wrapper' : 'header--nav__link main--menu__link-wrapper'}
                    ref={btnRef}
                    onMouseEnter={() => !isTouchDevice && setTimeout(openSubMenu, 0)}
                    onClick={() => !isTouchDevice && openSubMenu()}
                    onPointerDown={handlePointerDown}
                >
                    <div className='main--menu__link'>
                        {title}
                    </div>
                </button>

                <div className='header--nav__sub-menu' ref={subMenuRef}>
                    <ul>
                        {optionsList}
                    </ul>
                </div>
            </div>
        </>
    );
}