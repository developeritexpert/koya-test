import React, { useState, useRef } from 'react';
import './stylesGallery.scss';

const GalleryItem = ({ i, currImage, onImageSelected }) => {
  const [captionVisible, setCaptionVisible] = useState(false);
  const lastTapRef = useRef(null);
  const DOUBLE_TAP_DELAY = 300;

  const toggleCaption = () => setCaptionVisible(prev => !prev);

  const handleTouchStart = (e) => {
    if (!currImage.rollOver) {
      // No rollover content — just pass through to onClick
      return;
    }

    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap → trigger selection
      lastTapRef.current = null;
      setCaptionVisible(false);
      onImageSelected(i);
      e.preventDefault(); // prevent onClick firing again
    } else {
      // First tap → show caption
      lastTapRef.current = now;
      setCaptionVisible(true);
    }
  };

  return (
    <button
      key={i}
      className={currImage.rollOver ? 'gallery--image-black' : 'gallery--image'}
      style={{ left: currImage.left, top: currImage.top }}
      onClick={() => onImageSelected(i)}
      onMouseEnter={() => currImage.rollOver && setCaptionVisible(true)}
      onMouseLeave={() => setCaptionVisible(false)}
      onTouchStart={handleTouchStart}
    >
      <img src={process.env.PUBLIC_URL + currImage.src} alt={currImage.title} />

      {captionVisible && currImage.rollOver && (
        <div className="gallery--caption">
          <h1>{currImage.rollOver}</h1>
        </div>
      )}
    </button>
  );
};

export default GalleryItem;