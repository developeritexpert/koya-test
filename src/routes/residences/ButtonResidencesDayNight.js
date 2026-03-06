import React from "react";

const ButtonResidencesDayNight = ({ data, onSelect, selected }) => {
    return (
        <button
            className={`residences--building__btn_Day_Night ${
                selected ? "residences--building__btn_Day_Night__active" : ""
            }`}
            onClick={onSelect}
            style={{ top: data.top, left: data.left }}
        >
            <img src={data.imgSrc} alt={data.title}/>
        </button>
    )
}

export default ButtonResidencesDayNight;
