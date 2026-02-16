import React from "react";

const ApartmentDropDownSubMenuList = ({ subMenuRef, optionsList, data }) => {
    return (
        <div className='header--dropdown__sub-menu' ref={ subMenuRef }>
            <ul>
            { optionsList }

            </ul>
        </div> 
    ); 
}

export default ApartmentDropDownSubMenuList;