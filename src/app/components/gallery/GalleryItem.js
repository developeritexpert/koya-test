import React, { useState, useEffect } from 'react';
import './stylesGallery.scss';

const GalleryItem = ({ i, currImage, onImageSelected }) => {
  const [captionVisible, setCaptionVisible] = useState(false);
  const [lastTapped, setLastTapped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isTouchDevice) return;
    const handleOutsideTap = () => setLastTapped(false);
    document.addEventListener('pointerdown', handleOutsideTap);
    return () => document.removeEventListener('pointerdown', handleOutsideTap);
  }, [isTouchDevice]);

  const handlePointerDown = (e) => {
    if (!isTouchDevice) return;

    e.stopPropagation();

    if (!currImage.rollOver) {
      onImageSelected(i);
      return;
    }

    if (!lastTapped) {
      setCaptionVisible(true);
      setLastTapped(true);
    } else {
      setCaptionVisible(false);
      setLastTapped(false);
      onImageSelected(i);
    }
  };

  return (
    <button
      className={currImage.rollOver ? 'gallery--image-black' : 'gallery--image'}
      style={{ left: currImage.left, top: currImage.top }}
      onClick={() => !isTouchDevice && onImageSelected(i)}
      onMouseEnter={() => !isTouchDevice && currImage.rollOver && setCaptionVisible(true)}
      onMouseLeave={() => !isTouchDevice && setCaptionVisible(false)}
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