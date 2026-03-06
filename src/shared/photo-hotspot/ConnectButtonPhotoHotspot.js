import React, { useRef, useState, useEffect } from 'react';
import { selectEnlarged } from '../enlarged';
import { connect } from 'react-redux';
import './stylesPhotoHotspot.scss'

function ButtonPhotoHotspot({ data, onSelected, selectEnlarged }) {
  const imgRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  // Touch device detection
  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
    
    setIsTouchDevice(checkTouchDevice());
  }, []);

  // Custom fadeIn function
  const customFadeIn = (element) => {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.visibility = 'visible';
    
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.3s ease';
      element.style.opacity = '1';
    });
  };

  // Custom fadeOut function
  const customFadeOut = (element) => {
    if (!element) return;
    
    element.style.transition = 'opacity 0.3s ease';
    element.style.opacity = '0';
    
    setTimeout(() => {
      if (element.style.opacity === '0') {
        element.style.visibility = 'hidden';
        element.style.display = 'none';
      }
    }, 300);
  };

  // Effect to handle clicks outside the component on touch devices
  useEffect(() => {
    if (!isTouchDevice) return;
    
    const handleClickOutside = (event) => {
      // If this hotspot is active and user clicks elsewhere, hide the image
      if (isActive && imgRef.current && 
          !event.target.closest('.amenities--hotspot')) {
        customFadeOut(imgRef.current);
        setIsActive(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isTouchDevice, isActive]);

  const onMouseEnter = (event) => {
    if (isTouchDevice) return;
    onSelected(event.currentTarget.parentNode);
    if (imgRef.current) {
      imgRef.current.style.zIndex = '3';
      customFadeIn(imgRef.current);
    }
  }

  const handleTouch = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // If this hotspot is already active, hide it
    if (isActive) {
      if (imgRef.current) {
        customFadeOut(imgRef.current);
      }
      setIsActive(false);
      return;
    }
    
    // Otherwise, show this hotspot and hide others
    setIsActive(true);
    
    // Hide all other hotspot images
    const otherImages = document.querySelectorAll('.amenities--hotspot__tmb');
    for (let i = 0; i < otherImages.length; i++) {
      if (otherImages[i] !== imgRef.current) {
        customFadeOut(otherImages[i]);
      }
    }
    
    onSelected(event.currentTarget.parentNode);
    
    if (imgRef.current) {
      imgRef.current.style.zIndex = '3';
      customFadeIn(imgRef.current);
    }
  }

  const onClick = (event) => {
    // For non-touch devices only
    if (isTouchDevice) {
      event.preventDefault();
      return;
    }
    
    if (data.href !== undefined) {
      selectEnlarged({ srcList: [data.href] });
    }
  }

  const onMouseLeave = () => {
    if (isTouchDevice || !imgRef.current) return;
    customFadeOut(imgRef.current);
  }

  return (
    <div className='amenities--hotspot' style={{ left: data.left, top: data.top }}>
      <button 
        className='amenities--hotspot__btn' 
        onClick={onClick} 
        onMouseEnter={!isTouchDevice ? onMouseEnter : undefined} 
        onMouseLeave={!isTouchDevice ? onMouseLeave : undefined}
        onTouchStart={isTouchDevice ? handleTouch : undefined}
      ></button>
      <img 
        className={'amenities--hotspot__tmb ' + (data.align || '')} 
        src={data.src} 
        ref={imgRef} 
        alt={data.title} 
        style={{ display: 'none', visibility: 'hidden', opacity: '0' }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  selectEnlarged: (data) => dispatch(selectEnlarged(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonPhotoHotspot);