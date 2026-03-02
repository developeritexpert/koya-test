import React, { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { gsap } from 'gsap/all';

export default function ButtonHeaderSubMenu({ title, options, parentActive }) {
  const location = useLocation();
  const containerRef = useRef(null);
  const subMenuRef = useRef(null);
  let isMenuOpen = false;

  const optionsList = options.map((option, i) => {
    // active if current path matches option path
    const isSelected =
      location.pathname === option.path || location.pathname.startsWith(option.path);

    return (
      <li key={i} className="sub--menu-item">
        <NavLink
          className={`header--nav__link-in-sub-menu ${isSelected ? 'header--nav__link-selected' : ''}`}
          to={option.path}
        >
          <span className="submenu-text">{option.title}</span>
        </NavLink>
      </li>
    );
  });

  const openSubMenu = () => {
    if (!isMenuOpen) {
      isMenuOpen = true;

      const el = subMenuRef.current;
      el.style.display = 'block';
      el.style.top = '75%';
      el.style.opacity = 0;

      gsap.to(el, 0.3, { top: '80%', opacity: 1 });

      document.addEventListener('click', closeSubMenu);
      containerRef.current?.addEventListener('mouseleave', closeSubMenu);
    }
  };

  const closeSubMenu = () => {
    if (!isMenuOpen) return;
    isMenuOpen = false;

    document.removeEventListener('click', closeSubMenu);
    containerRef.current?.removeEventListener('mouseleave', closeSubMenu);

    gsap.killTweensOf(subMenuRef.current);
    subMenuRef.current.style.display = 'none';
  };

  return (
    <div ref={containerRef}>
      <button
        className={
          parentActive
            ? 'header--nav__link-selected main--menu__link-wrapper'
            : 'header--nav__link main--menu__link-wrapper'
        }
        onMouseEnter={openSubMenu}
        onClick={openSubMenu}
      >
        <div className="main--menu__link">{title}</div>
      </button>

      <div className="header--nav__sub-menu" ref={subMenuRef}>
        <ul>{optionsList}</ul>
      </div>
    </div>
  );
}