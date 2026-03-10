import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectLevel, selectArea } from './index';
import { data } from './dataResidences';


function ConnectViewResidencesMenu({ selectedLevel, currRotation, selectLevel, selectArea }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSub, setActiveSub] = useState(null);
  const [lastTapped, setLastTapped] = useState(null);

  const levelsData = Object.keys(data.levelGroups)
    .filter(key => key !== 'Type')
    .map(key => ({
      key,
      title: key,
      subLevels: data.levelGroups[key],
    }));

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleOutsideTap = () => setLastTapped(null);
    document.addEventListener('pointerdown', handleOutsideTap);
    return () => document.removeEventListener('pointerdown', handleOutsideTap);
  }, []);

  const handleSubHover = (subKey) => {
    if (!('ontouchstart' in window)) {
      setActiveSub(subKey);
      if (data.rotationOverlays[currRotation]?.[subKey]) selectArea(subKey);
    }
  };

  const handleSubLeave = () => {
    if (!('ontouchstart' in window)) {
      setActiveSub(null);
      selectArea(null);
    }
  };

  const handleSubPointer = (subKey, target, e) => {
    e.stopPropagation();
    if (lastTapped !== subKey) {
      setActiveSub(subKey);
      setLastTapped(subKey);
      if (data.rotationOverlays[currRotation]?.[subKey]) selectArea(subKey);
    } else {
      selectLevel(target);
      setActiveSub(null);
      setLastTapped(null);
      selectArea(null);
    }
  };

  const handleSubClick = (subKey, target) => {
    if (!('ontouchstart' in window)) {
      selectLevel(target);
      setActiveSub(subKey);
      if (data.rotationOverlays[currRotation]?.[subKey]) selectArea(subKey);
    }
  };

  return (
    <div className="residences--menu" style={{ touchAction: 'manipulation' }}>
      <button
        className={`residences--menu__toggle ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        style={{ minWidth: 48, minHeight: 48 }}
      >
        Explore
      </button>

      <ul className={`residences--menu__list ${menuOpen ? 'open' : ''}`}>
        {levelsData.map(level => (
          <li key={level.key}>
            {level.subLevels && (
              <ul className={`residences--menu__sublist ${menuOpen ? 'open' : ''}`}>
                {level.subLevels.map((sub, index) => {
                  const subKey = sub.level || sub.target;
                  const isActive = activeSub === subKey;

                  return (
                    <li key={sub.target}>
                      <button
                        className={`${selectedLevel === sub.target ? 'active' : ''} ${isActive ? 'overlay-active' : ''}`}
                        onMouseEnter={() => handleSubHover(subKey)}
                        onMouseLeave={handleSubLeave}
                        onClick={() => handleSubClick(subKey, sub.target)}
                        onPointerDown={(e) => handleSubPointer(subKey, sub.target, e)}
                        style={{ minWidth: 48, minHeight: 48, padding: "8px 0px" }}
                      > 
                      <span className="residences--menu__list-span">
                        {sub.level || sub.title}
                      </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedLevel: state.residences.selectedLevel,
  currRotation: state.residences.currRotation,
});

const mapDispatchToProps = {
  selectLevel,
  selectArea,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectViewResidencesMenu);
