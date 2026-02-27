import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { closeApartment } from './';

function ViewResidencesApartment({ residences, closeApartment }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
  }, [residences.apartment, residences.isApartmentActive]);

  if (!residences.apartment) return null;

  return (
    <CSSTransition
      className='residences--apartment'
      in={residences.isApartmentActive}
      timeout={500}
      classNames='fade'
      unmountOnExit
    >
      <div
        className='residences--apartment-container'
        style={{
          opacity: imgLoaded ? 1 : 0,
          transition: 'opacity 500ms ease',
        }}
      >
        <img
          className='shared--img-fill'
          src={`./img/floor-plans/floorplan-type-${residences.apartment}.jpg`}
          width='1920'
          height='1080'
          alt='residences apartment floorplan'
          onLoad={() => setImgLoaded(true)}
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