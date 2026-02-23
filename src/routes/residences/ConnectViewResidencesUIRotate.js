import React from 'react';
import { connect } from 'react-redux'
import { updateRotation, updateIsAnimating } from './'
import rotateResidences from './rotateResidences';
import ButtonResidencesRotate from './ButtonResidencesRotate';

function ViewResidencesUIRotate({ currRotation, isAnimating, updateRotation, updateIsAnimating }) {

  const onRotateSelected = (increment) => {
    if (!isAnimating) {
      // Determine the adjusted increment based on the stopping frames and current rotation
      let adjustedIncrement = increment;

      if (increment.startsWith('+=') && currRotation === 36) {
        adjustedIncrement = '+=18'; // Moving from 36 to 56
      } else if (increment.startsWith('-=') && currRotation === 54) {
        adjustedIncrement = '-=18'; // Moving from 56 to 36
      } else if (increment.startsWith('-=') && currRotation === 0) {
        adjustedIncrement = '-=18'; // Moving from 0 to 56
      } else if (increment.startsWith('+=') && currRotation === 54) {
        adjustedIncrement = '+=18'; // Moving from 56 to 0
      }


      updateIsAnimating(true);
      rotateResidences(adjustedIncrement, currRotation, onResidencesRotating, onBuildingRotationComplete);
    }
  };

  const onResidencesRotating = (rotation) => {
    updateRotation(rotation);
  };

  const onBuildingRotationComplete = () => {
    updateIsAnimating(false);
  };

  return (
    <>
      <ButtonResidencesRotate
        className="residences--button__rotate-left"
        imgRef="./img/interface/icon-rotate-left-white.png"
        onSelected={() => onRotateSelected('+=18')}
      />
      <ButtonResidencesRotate
        className="residences--button__rotate-right"
        imgRef="./img/interface/icon-rotate-right-white.png"
        onSelected={() => onRotateSelected('-=18')}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  currRotation: state.residences.currRotation,
  isAnimating: state.residences.isAnimating
})

const mapDispatchToProps = (dispatch) => ({
  updateRotation: (currRotation) => dispatch(updateRotation(currRotation)),
  updateIsAnimating: (isAnimating) => dispatch(updateIsAnimating(isAnimating))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewResidencesUIRotate)

