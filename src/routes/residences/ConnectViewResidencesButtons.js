import React from 'react';
import { connect } from 'react-redux'
import { updateRotation, updateIsAnimating } from './'
import rotateResidences from './rotateResidences';
import ButtonResidencesRotate from './ButtonResidencesRotate';
import ButtonResidencesBuilding from './ButtonResidencesBuilding';
import ButtonResidencesBuildingSelected from './ButtonResidencesBuildingSelected';

function ConnectViewResidencesButtons ( { currRotation, isAnimating, updateRotation, updateIsAnimating } ) {
  const onRotateSelected = (increment) => {
    if (!isAnimating) {
      updateIsAnimating(true);
      rotateResidences(increment, currRotation, onResidencesRotating, onBuildingRotationComplete);
    }
  }

  const onResidencesRotating = (rotation) => {
    updateRotation(rotation);
  }

  const onBuildingRotationComplete = () => {
    updateIsAnimating(false);
  }

  const renderButtons = () => {
    if (currRotation === 0) {
        //tower 2
        return (
            <>
                <ButtonResidencesBuilding data={{ title: 'Tower 1', left: 410, top: 495 }} onSelected={ () => onRotateSelected('+=18') } />
                <ButtonResidencesBuildingSelected data={{ title: 'Tower 2', left: 410, top: 555 }} />
                <ButtonResidencesBuilding data={{ title: 'Tower 3', left: 410, top: 615 }} onSelected={ () => onRotateSelected('-=18') } />
                <ButtonResidencesBuilding data={{ title: 'Tower 4', left: 410, top: 675 }} onSelected={ () => onRotateSelected('+=36') } />
            </>
        )
    } else if (currRotation === 18) {
        //tower 1
        return (
            <>
                <ButtonResidencesBuildingSelected data={{ title: 'Tower 1', left: 410, top: 495 }} />
                <ButtonResidencesBuilding data={{ title: 'Tower 2', left: 410, top: 555 }} onSelected={ () => onRotateSelected('-=18') } />
                <ButtonResidencesBuilding data={{ title: 'Tower 3', left: 410, top: 615}} onSelected={ () => onRotateSelected('+=36') } />
                <ButtonResidencesBuilding data={{ title: 'Tower 4', left: 410, top: 675 }} onSelected={ () => onRotateSelected('+=18') } />
            </>
        )
    } else if (currRotation === 36) {
        //tower 4
        return (
            <>
                <ButtonResidencesBuilding data={{ title: 'Tower 1', left: 410, top: 495 }} onSelected={ () => onRotateSelected('-=18') } />
                <ButtonResidencesBuilding data={{ title: 'Tower 2', left: 410, top: 555 }} onSelected={ () => onRotateSelected('+=36') } />
                <ButtonResidencesBuilding data={{ title: 'Tower 3', left: 410, top: 615 }} onSelected={ () => onRotateSelected('+=20') } />
                <ButtonResidencesBuildingSelected data={{ title: 'Tower 4', left: 410, top: 675 }} />
            </>
        )
    } else if (currRotation === 56) {
        //tower 3
        return (
            <>
                <ButtonResidencesBuilding data={{ title: 'Tower 1', left: 410, top: 495 }} onSelected={ () => onRotateSelected('+=16') } />
                <ButtonResidencesBuilding data={{ title: 'Tower 2', left: 410, top: 555 }} onSelected={ () => onRotateSelected('+=16') } />
                <ButtonResidencesBuildingSelected data={{ title: 'Tower 3', left: 410, top: 615 }} />
                <ButtonResidencesBuilding data={{ title: 'Tower 4', left: 410, top: 675 }} onSelected={ () => onRotateSelected('-=20') } />
            </>
        )
    }

    return <div />
  }
  return (
    renderButtons()
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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectViewResidencesButtons)