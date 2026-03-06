
import React, { useRef, useState } from 'react';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import { gsap } from 'gsap/all';
import { selectApartment } from './';
import { connect } from 'react-redux';
import ApartmentDropDownSubMenuItem from './ApartmentDropDownSubMenuItem';
import ApartmentDropDownSubMenuList from './ApartmentDropDownSubMenuList';


const ApartmentDropDownSubMenu = ( { data, options, selectApartment } ) => {
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

        optionsList.push(
            <ApartmentDropDownSubMenuItem selectApartment={selectApartment} option={option} i={i} />
        );
        
    }

    const openSubMenu = async () => {
        if (!isMenuOpen) {
            isMenuOpen = true;
            subMenuRef.current.style.display = 'block';
            subMenuRef.current.style.position = 'absolute';
            subMenuRef.current.style.opacity = 0;
            subMenuRef.current.style.marginLeft = '-26px';
            subMenuRef.current.style.marginTop = '38px';
            subMenuRef.current.style.height = options.length * (parseInt("40px".replace(/px/,"")))+"px"
            gsap.to(subMenuRef.current, 0.3, { opacity: 1 } );
            document.addEventListener('click', closeSubMenu);
            containerRef.current.addEventListener('mouseleave', onMouseLeaveContainer);
        }
    }

    const onMouseLeaveContainer = (event) => {
        closeSubMenu();
    }

    const closeSubMenu = (event) => {
        if (isMenuOpen) {
            isMenuOpen = false;
            containerRef.current.removeEventListener('mouseleave', onMouseLeaveContainer);
            document.removeEventListener('click', closeSubMenu);
            gsap.killTweensOf(subMenuRef.current);
            subMenuRef.current.style.display = 'none';
        }
    }

    return (
        <>
            <div ref={ containerRef } style={ { position: 'absolute', left: data.left, top: data.top } }>
                <button className='residences--apartment-btn' onMouseEnter={ () => setTimeout(openSubMenu, 0) } onClick={ openSubMenu }></button>
                <ApartmentDropDownSubMenuList subMenuRef={subMenuRef} data={data} optionsList={optionsList} />
            </div> 
        </>       
    );

}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selectApartment: (apartment) => dispatch(selectApartment(apartment))
});

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentDropDownSubMenu);