// ConnectButtonResidencesHotspot.js
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { selectLevelGroup, selectArea, deselectArea, toggleRoomSelector } from '.';
import { ROOM_TYPES } from './types';
import RoomIndicator from './RoomIndicator';

function ButtonResidencesHotspot({
  data,
  selectLevelGroup,
  selectArea,
  deselectArea,
  roomSizes,
  roomSelectorVisible,
  toggleRoomSelector
}) {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Build submenu items
  const getSubMenu = () => {
    return (data.levelGroups || []).map((group, i) => {
      const hasRoomSize = group?.roomSizes?.some(size => roomSizes.includes(size));
      return (
        <li key={i} style={{ display: 'flex', flexDirection: 'row' }}>
          <button
            className={group.inactive ? 'residences--hotspot__sub-menu-item-inactive' : 'residences--hotspot__sub-menu-item'}
            onClick={() => !group.inactive && selectLevelGroup({ levelGroup: group.target })}
            onMouseEnter={() => selectArea(group.level)}
            onMouseLeave={() => deselectArea()}
          >
            {group.level}
          </button>
          {hasRoomSize && <RoomIndicator />}
        </li>
      );
    });
  };

  const toggleSubMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);

    if (nextState && roomSelectorVisible) toggleRoomSelector(false);
    if (nextState) toggleRoomSelector(true);
  };

  return (
    <div
      className="residences--hotspot"
      ref={containerRef}
      style={{
        left: data.left,
        top: data.top,
        position: 'absolute',
        zIndex: 2100 // above floorplate
      }}
    >
      <button
        className={`residences--hotspot__btn ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleSubMenu}
      >
        {data.title} <br /> {data.subtitle}
      </button>

      {isMenuOpen && (
        <div className="residences--hotspot__sub-menu show">
          <ul>{getSubMenu()}</ul>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  roomSelectorVisible: state.residences.roomSelectorVisible,
  roomSizes: state.residences.roomSizes,
});

const mapDispatchToProps = dispatch => ({
  selectLevelGroup: (levelGroup) => dispatch(selectLevelGroup(levelGroup)),
  selectArea: (area) => dispatch(selectArea(area)),
  deselectArea: () => dispatch(deselectArea()),
  toggleRoomSelector: (condition) => dispatch(toggleRoomSelector(condition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonResidencesHotspot);
