import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { closeLevelGroup, selectApartment } from './';
import { data } from './dataResidences';

function ViewResidencesLevelGroup({ residences, closeLevelGroup, selectApartment }) {
  const levelKey = residences.selectedLevel || residences.levelGroup;
  const floorplateSrc = `./img/floor-plates/Floorplate_${levelKey}.jpg`;
  const apartments = data.levelGroupApartments[levelKey] || [];

  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
  }, [levelKey, residences.isLevelGroupActive]);

  return (
    // Outer CSSTransition handles mount/unmount as before
    <CSSTransition
      in={residences.isLevelGroupActive}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      {/* Inner div starts invisible, fades in only after image loads */}
      <div
        className="residences--level-group-container"
        style={{
          opacity: imgLoaded ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      >
        <img
          className="shared--img-fill"
          src={floorplateSrc}
          alt={`Floorplate ${levelKey}`}
          width="1920"
          height="1080"
          onLoad={() => setImgLoaded(true)}
        />

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
          />
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