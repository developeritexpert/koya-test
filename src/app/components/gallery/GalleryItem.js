import React, { useState } from 'react';
import './stylesGallery.scss';

const GalleryItem = ({ i, currImage, onImageSelected }) => {
  const [caption, setCaption] = useState(false);

  return (
    <>
    <button
      key={i}
      className={!!currImage.rollOver ? 'gallery--image-black':'gallery--image'}
      style={{ left: currImage.left, top: currImage.top }}
      onClick={() => onImageSelected(i)}
      onMouseEnter={() => currImage.caption && setCaption(true)}
      onMouseLeave={() => setCaption(false)}
    >
      <img src={process.env.PUBLIC_URL + currImage.src} alt={currImage.title} />
      
    </button>
    {caption && (
        <div
          style={{
            width: '435px',
            height: '300px',
            pointerEvents: 'none',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            left: currImage.left,
            top: currImage.top
          }}
        >
          <h1
            className='gallery--caption'
            style={{
              color: 'white',
              pointerEvents: 'none',
              textAlign: 'center',
              color: 'white',
              width: '310px',
              fontSize: '23px',
            }}


          >
            {currImage.rollOver}
          </h1>
        </div>
      )}
      </>
  );
};

export default GalleryItem;