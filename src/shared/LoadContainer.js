import React, { useRef, useState } from 'react';
import OnImagesLoaded from 'react-on-images-loaded';

export default function LoadContainer({ children }) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);

  const onImagesLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      <div className="shared--loading"></div>
      <div
        ref={containerRef}
        className={`shared--load-container ${loaded ? 'is-loaded' : ''}`}
      >
        <OnImagesLoaded onLoaded={onImagesLoaded}>
          {children}
        </OnImagesLoaded>
      </div>
    </>
  );
}
