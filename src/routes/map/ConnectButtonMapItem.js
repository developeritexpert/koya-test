import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectItem } from '.';

function ButtonAerialMapItem({ item, currItem, selectItem }) {
  useEffect(() => {
    selectItem(null);
  }, [selectItem]);

  return (
    <button
      className={item === currItem ? 'aerial-map--btn__active' : 'aerial-map--btn'}
      onClick={() => selectItem(item)}
    >
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
