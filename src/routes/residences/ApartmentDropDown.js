import React from 'react';
import './stylesResidences.scss'; // make sure your SCSS includes hotspot/button styling

function ApartmentDropDown({ data, selectApartment }) {
  if (!data) return null;

  return (
    <div
      className="residences--apartment-btn"
      style={{
        position: 'absolute',
        left: data.left,
        top: data.top,
        zIndex: 2100, // above floorplate
      }}
    >
      <button
        onClick={selectApartment}
        className="residences--apartment-btn__button"
        title={data.title}
      >
        {data.title}
      </button>
    </div>
  );
}

export default ApartmentDropDown;
