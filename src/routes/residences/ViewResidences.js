import React from 'react';
import ConnectViewResidencesRotation from './ConnectViewResidencesRotation';
import ConnectViewResidencesUIRotate from './ConnectViewResidencesUIRotate';
import ConnectViewResidencesLevelGroup from './ConnectViewResidencesLevelGroup';
import ConnectViewResidencesApartment from './ConnectViewResidencesApartment';
import ConnectViewResidencesDayNight from './ConnectViewResidencesDayNight';
import ConnectViewResidencesMenu from './ConnectViewResidencesMenu'; // consolidated menu
import LoadContainer from '../../shared/LoadContainer';
import './stylesResidences.scss';
import './stylesResidencesMenu.scss'; // menu styles

export default function ViewResidences() {
  // Generate all rotation frames
  const rotations = [];
  for (let i = 0; i <= 72; i++) {
    rotations.push(
      <ConnectViewResidencesRotation key={i} rotation={i} />
    );
  }

  return (
    <LoadContainer>
      {/* Rotation frames */}
      <div className="residences--rotations">
        {rotations}
      </div>


      <div className='residences--building-container'>
        {/* Day/Night toggle */}
        <ConnectViewResidencesDayNight />
        {/* Rotation UI controls */}
        <ConnectViewResidencesUIRotate />
      </div>

        {/* Level group / floorplate modal */}
        <ConnectViewResidencesLevelGroup />

        {/* Apartment buttons / modal */}
        <ConnectViewResidencesApartment />

      {/* Consolidated persistent menu */}
      <ConnectViewResidencesMenu />
    </LoadContainer>
  );
}
