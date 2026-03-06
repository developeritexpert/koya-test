import React, { useState, useEffect } from 'react';
import './stylesGallery.scss';

const GalleryItem = ({ i, currImage, onImageSelected }) => {
  const [captionVisible, setCaptionVisible] = useState(false);
  const [lastTapped, setLastTapped] = useState(false);

  useEffect(() => {
    const handleOutsideTap = () => setLastTapped(false);
    document.addEventListener('pointerdown', handleOutsideTap);
    return () => document.removeEventListener('pointerdown', handleOutsideTap);
  }, []);

  const handlePointerDown = (e) => {
    if (!('ontouchstart' in window)) return; // touch devices only

    e.stopPropagation(); // prevent the document listener from resetting lastTapped

    if (!currImage.rollOver) {
      // No caption — single tap triggers selection directly
      onImageSelected(i);
      return;
    }

    if (!lastTapped) {
      // First tap → show caption
      setCaptionVisible(true);
      setLastTapped(true);
    } else {
      // Second tap → trigger selection
      setCaptionVisible(false);
      setLastTapped(false);
      onImageSelected(i);
    }
  };

  return (
    <button
      className={currImage.rollOver ? 'gallery--image-black' : 'gallery--image'}
      style={{ left: currImage.left, top: currImage.top }}
      onClick={() => !('ontouchstart' in window) && onImageSelected(i)}
      onMouseEnter={() => currImage.rollOver && setCaptionVisible(true)}
      onMouseLeave={() => setCaptionVisible(false)}
      onPointerDown={handlePointerDown}
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