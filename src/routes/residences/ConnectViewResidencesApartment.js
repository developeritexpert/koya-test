import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { closeApartment } from './';

function ViewResidencesApartment({ residences, closeApartment }) {
  if (!residences.apartment) return null; // don't render if none selected

  return (
    <CSSTransition
      className='residences--apartment'
      in={residences.isApartmentActive}
      timeout={300}
      classNames='fade'
      unmountOnExit
    >
      <div className='residences--apartment-container'>
        <img
          className='shared--img-fill'
          src={`./img/floor-plans/floorplan-type-${residences.apartment}.jpg`}
          width='1920'
          height='1080'
          alt='residences apartment floorplan'
        />
        <button
          className='residences--apartment__close-btn'
          onClick={closeApartment}
        />
      </div>
    </CSSTransition>
  );
}

const mapStateToProps = (state) => ({
  residences: state.residences,
});

const mapDispatchToProps = (dispatch) => ({
  closeApartment: () => dispatch(closeApartment()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewResidencesApartment);
