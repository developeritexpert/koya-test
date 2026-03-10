import React from 'react';
import { connect } from 'react-redux';
import { selectApartment } from './';
import ApartmentDropDown from './ApartmentDropDown';
import { data } from './dataResidences';

function ButtonResidencesApartment({ selectedLevel, selectApartment }) {
  // Get apartments for the currently active level/floorplate
  const apartments = data.levelGroupApartments[selectedLevel] || [];

  return (
    <>
      {apartments.map((apt) => (
        <ApartmentDropDown
          key={apt.title}
          data={apt}
          selectApartment={() => selectApartment(apt)}
        />
      ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  selectedLevel: state.residences.selectedLevel, // get the currently active floorplate
});

const mapDispatchToProps = (dispatch) => ({
  selectApartment: (apartment) => dispatch(selectApartment(apartment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonResidencesApartment);
