import React, { useRef, useState, useEffect } from 'react'; 
import { selectEnlarged } from '../../shared/enlarged/'; 
import { connect } from 'react-redux'; 
import { utilAnimate } from '../../util/utilAnimate'

function ButtonAerialHotspot({ data, onSelected, selectEnlarged }) {
  const imgRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  // Simple and reliable touch detection
  useEffect(() => {
    const checkTouchDevice = () => {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false;
      }
      // Most reliable and widely supported methods
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
    
    // Set with a small delay to ensure proper detection
    const timer = setTimeout(() => {
      setIsTouchDevice(checkTouchDevice());
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Effect to handle clicks outside the component on touch devices
  useEffect(() => {
    if (!isTouchDevice) return;
    
    const handleClickOutside = (event) => {
      // If this hotspot is active and user clicks elsewhere, hide the image
      if (isActive && imgRef.current && 
          !event.target.closest('.features--hotspot')) {
        utilAnimate.fadeOut(imgRef.current);
        setIsActive(false);
      }
    };
    
    // Add event listeners for both mouse and touch events
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
      imgRef.current.style.zIndex = 3;
      utilAnimate.fadeIn(imgRef.current);
    }
  }

  const onTouch = (event) => {
    event.stopPropagation();
    
    // If this hotspot is already active, hide it
    if (isActive) {
      if (imgRef.current) {
        utilAnimate.fadeOut(imgRef.current);
      }
      setIsActive(false);
      return;
    }
    
    // Otherwise, show this hotspot and hide others
    setIsActive(true);
    
    // Hide all other hotspot images
    document.querySelectorAll('.features--hotspot__tmb').forEach(img => {
      if (img !== imgRef.current) {
        utilAnimate.fadeOut(img);
      }
    });
    
    onSelected(event.currentTarget.parentNode);
    
    if (imgRef.current) {
      imgRef.current.style.zIndex = 3;
      utilAnimate.fadeIn(imgRef.current);
    }
  }

  const onClick = () => {
    if (data.href !== undefined) {
      selectEnlarged({
        srcList: [data.href],
        dayEnlarged: 'Night',
        currSrcIndex: 0,
        captionList: data.caption
      });
    }
  }

  const onMouseLeave = () => {
    if (isTouchDevice || !imgRef.current) return;
    utilAnimate.fadeOut(imgRef.current);
  }

  return (
    <div className='features--hotspot' style={{ left: data.left, top: data.top }}>
      <button 
        className='features--hotspot__btn' 
        onClick={!isTouchDevice ? onClick : undefined}
        onMouseEnter={!isTouchDevice ? onMouseEnter : undefined}
        onMouseLeave={!isTouchDevice ? onMouseLeave : undefined}
        onTouchStart={isTouchDevice ? onTouch : undefined}
      ></button>
      <img 
        className={'features--hotspot__tmb ' + (data.animDir || '') + ' ' + (data.align || '')}
        onClick={onClick}
        src={data.src}
        caption={data.caption}
        ref={imgRef}
        alt={data.title}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  selectEnlarged: (data) => dispatch(selectEnlarged(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAerialHotspot);