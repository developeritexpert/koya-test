import React, { useState } from 'react';
import './stylesGallery.scss';

const GalleryItem = ({ i, currImage, onImageSelected }) => {
  const [captionVisible, setCaptionVisible] = useState(false);

  const toggleCaption = () => setCaptionVisible(prev => !prev);

  return (
    <button
      key={i}
      className={currImage.rollOver ? 'gallery--image-black' : 'gallery--image'}
      style={{ left: currImage.left, top: currImage.top }}
      onClick={() => onImageSelected(i)}
      onMouseEnter={() => currImage.rollOver && setCaptionVisible(true)}
      onMouseLeave={() => setCaptionVisible(false)}
      onTouchStart={toggleCaption}
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
