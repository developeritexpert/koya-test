import React from 'react';
import { selectApartment } from '.';
import { connect } from 'react-redux';

function ButtonResidencesBuilding ({ data, onSelected }) {

  return (
    <button onClick={ onSelected } className='residences--building__btn' style={ { left: data.left, top: data.top } }>{data.title}</button>
  );

}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selectApartment: (apartment) => dispatch(selectApartment(apartment))
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonResidencesBuilding);