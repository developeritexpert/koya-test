import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectItem } from '.';

function ButtonAerialMapItem({ item, currItem, selectItem, index }) {
  useEffect(() => {
    selectItem(null);
  }, [selectItem]);

  return (
    <button
      className={item === currItem ? 'aerial-map--btn__active' : 'aerial-map--btn'}
      onClick={() => selectItem(item)}
    >
      <span className="aerial-map--btn--inner">
        <span className='aerial-map--number'>{String(index + 1).padStart(2, '0')}</span>
        <span className={item === currItem ? 'aerial-map--text__active' : ''}>
          {item}
        </span>
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
