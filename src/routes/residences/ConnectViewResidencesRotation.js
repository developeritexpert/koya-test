import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { data } from './dataResidences';
import ViewPhotoHotspots from '../../shared/photo-hotspot/ViewPhotoHotspots';
import { selectArea, selectLevel } from './index';

function ConnectViewResidencesRotation({
  rotation,
  currRotation,
  area,
  isAreaActive,
  Day,
  selectArea,
  selectLevel,
}) {
  const [lastTapped, setLastTapped] = useState(null);

  const display = rotation === currRotation ? 'block' : 'none';
  const stringRotation = rotation < 10 ? `0${rotation}` : rotation.toString();
  const fileRef = `./img/apartments-3d-floorplans/3D_Floorplans_${Day}/KEB003_3D_Floorplans_${Day.charAt(0).toUpperCase() + Day.slice(1)}_${stringRotation}.jpg`;

  useEffect(() => {
    const handleOutsideTap = () => setLastTapped(null);
    document.addEventListener('pointerdown', handleOutsideTap);
    return () => document.removeEventListener('pointerdown', handleOutsideTap);
  }, []);

  const getOverlay = () => {
    const overlays = data.rotationOverlays[rotation];
    if (!overlays) return null;

    return Object.keys(overlays).map((key, idx) => {
      const overlayArea = overlays[key];
      const overlayDisplay = isAreaActive && area === key ? 'block' : 'none';

      const handlePointer = (e) => {
        e.stopPropagation();

        if (lastTapped !== key) {
          // First tap → highlight overlay
          selectArea(key);
          setLastTapped(key);
        } else {
          // Second tap → select level / open floorplate
          selectLevel(key);
          selectArea(null);
          setLastTapped(null);
        }
      };

      return (
        <img
          key={idx}
          className="residences--rotation-overlay"
          src={overlayArea.src}
          alt={key}
          style={{
            display: overlayDisplay,
            top: overlayArea.top,
            left: overlayArea.left,
            touchAction: 'manipulation',
          }}
          onMouseEnter={() => selectArea(key)}
          onMouseLeave={() => selectArea(null)}
          onPointerDown={handlePointer}
        />
      );
    });
  };

  const getPhotoHotspots = () => {
    const photoHotspots = data.rotationPhotoHotspots[rotation];
    if (photoHotspots) return <ViewPhotoHotspots data={photoHotspots} />;
    return null;
  };

  return (
    <div style={{ display, touchAction: 'manipulation' }}>
      <img src={fileRef} className="shared--img-fill" alt={`Rotation ${rotation}`} />
      {getOverlay()}
      <div className="features--hotspots-container">{getPhotoHotspots()}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currRotation: state.residences.currRotation,
  area: state.residences.area,
  isAreaActive: state.residences.isAreaActive,
  Day: state.residences.Day,
});

const mapDispatchToProps = {
  selectArea,
  selectLevel
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectViewResidencesRotation);
