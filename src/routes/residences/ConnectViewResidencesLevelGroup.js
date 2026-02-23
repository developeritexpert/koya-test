// ConnectViewResidencesLevelGroup.js
import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { closeLevelGroup, selectApartment } from './';
import { data } from './dataResidences';

function ViewResidencesLevelGroup({ residences, closeLevelGroup, selectApartment }) {
  const levelKey = residences.selectedLevel || residences.levelGroup;

  // Get floorplate image
  const floorplateSrc = `./img/floor-plates/Floorplate_${levelKey}.jpg`;

  // Get apartments for this level
  const apartments = data.levelGroupApartments[levelKey] || [];

  return (
    <CSSTransition
      className="residences--level-group-container"
      in={residences.isLevelGroupActive}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div className={`residences--level-group-container ${residences.isLevelGroupActive ? 'active' : ''}`}>
        <img
          className="shared--img-fill"
          src={floorplateSrc}
          alt={`Floorplate ${levelKey}`}
          width="1920"
          height="1080"
        />

        {/* Render apartment hotspot buttons */}
        {apartments.map((apt, i) => (
          <button
            key={i}
            className="residences--apartment-btn"
            style={{
              position: 'absolute',
              left: apt.left,
              top: apt.top,
            }}
                onClick={() => {
                console.log('Button clicked:', apt.type);
                selectApartment(apt.type);
                }}
          >
            {/*apt.title*/} 
          </button>
        ))}

        <button
          className="residences--level-group__close-btn"
          onClick={closeLevelGroup}
        />
      </div>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  residences: state.residences,
});

const mapDispatchToProps = dispatch => ({
  closeLevelGroup: () => dispatch(closeLevelGroup()),
  selectApartment: (apartment) => dispatch(selectApartment(apartment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewResidencesLevelGroup);
