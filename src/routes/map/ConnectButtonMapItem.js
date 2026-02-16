import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectItem } from '.';

function ButtonAerialMapItem({ item, currItem, selectItem }) {
  const itemStripped = item
    .replace(/\s/g, '-')
    .replace(/’/g, '')
    .replace(/&/g, 'and')
    .replace(/\//ig, '-')
    .toLowerCase();

  const iconSrc = './img/location-map/icon--' + itemStripped + '.png';
  const iconSrcSelected = './img/location-map/icon--' + itemStripped + '-selected.png';

  const [icon, setIcon] = useState(iconSrc);

  useEffect(() => {
    selectItem(null);
  }, [selectItem]);

  return (
    <button
      className={item === currItem ? 'aerial-map--btn__active' : 'aerial-map--btn'}
      onClick={() => selectItem(item)}
      onMouseEnter={() => setIcon(iconSrcSelected)}
      onMouseLeave={() => setIcon(iconSrc)}
    >
      <img
        src={item === currItem ? iconSrcSelected : icon}
        width="45"
        height="45"
        alt="item icon"
      />
      <span className={item === currItem ? 'aerial-map--text__active' : ''}>
        {item}
      </span>
    </button>
  );
}

const mapStateToProps = (state) => ({
  currItem: state.aerialMap.currItem,
});

const mapDispatchToProps = (dispatch) => ({
  selectItem: (currItem) => dispatch(selectItem(currItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAerialMapItem);
