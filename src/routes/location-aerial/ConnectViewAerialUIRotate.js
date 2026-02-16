import React from 'react';
import { connect } from 'react-redux'
import { updateRotation, updateIsAnimating } from '.'
import rotateFeatures from './rotateFeatures';
import ButtonAerialRotate from './ButtonAerialRotate';


function ViewAerialUIRotate ( { currRotation, isAnimating, updateRotation, updateIsAnimating } ) {

  const onRotateSelected = (increment) => {
    if (!isAnimating) {
      updateIsAnimating(true);
      rotateFeatures(increment, currRotation, onFeaturesRotating, onBuildingRotationComplete);
    }
  }

  const onFeaturesRotating = (rotation) => { 
    updateRotation(rotation);
  }

  const onBuildingRotationComplete = () => {
    updateIsAnimating(false);
  }

  return (
    <>
      <ButtonAerialRotate className='features--button__rotate-left' imgRef='./img/interface/btn-rotate-left.png' onSelected={ () => onRotateSelected('+=18') } />
      <ButtonAerialRotate className='features--button__rotate-right' imgRef='./img/interface/btn-rotate-right.png' onSelected={ () => onRotateSelected('-=18') }  />
    </>
  );

}


const mapStateToProps = (state) => ({
  currRotation: state.features.currRotation,
  isAnimating: state.features.isAnimating
})

const mapDispatchToProps = (dispatch) => ({
  updateRotation: (currRotation) => dispatch(updateRotation(currRotation)),
  updateIsAnimating: (isAnimating) => dispatch(updateIsAnimating(isAnimating))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewAerialUIRotate)