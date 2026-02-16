import React from "react";

const ApartmentDropDownSubMenuItem = ({ selectApartment, option, i}) => {
    return (
        <li key={i}>
            <button className='dropdown-sub-menu-item' onClick={ () => selectApartment(option) }>{option}</button>
        </li>
    )
}

export default ApartmentDropDownSubMenuItem;