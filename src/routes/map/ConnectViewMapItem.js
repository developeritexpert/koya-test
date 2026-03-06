import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { utilAnimate } from '../../util/utilAnimate';

function ViewMapItem({ item, currItem, fadeDuration = 1000 }) {
  const imgRef = useRef(null);

  // Normalize item string for filename
  const itemStripped = item
    .replace(/\s/g, '-')
    .replace(/’/g, '')
    .replace(/&/g, 'and')
    .replace(/\//ig, '-')
    .toLowerCase();

  const iconSrc = './img/location-map/frg--' + itemStripped + '.jpg';

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    // Convert fade duration from ms → seconds for GSAP
    const speedSec = fadeDuration / 1000;

    if (item === currItem) {
      utilAnimate.fadeIn(el, speedSec);
    } else {
      utilAnimate.fadeOut(el, speedSec);
    }
  }, [currItem, item, fadeDuration]);

  return (
    <img
      ref={imgRef}
      className="shared--img-fill-map aerial-map--main-img"
      src={iconSrc}
      alt={item}
      style={{
        opacity: 0,             // start invisible
        position: 'absolute',   // stack images
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none',  // prevent clicks
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  currItem: state.aerialMap.currItem,
});

export default connect(mapStateToProps)(ViewMapItem);
