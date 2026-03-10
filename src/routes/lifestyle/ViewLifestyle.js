import React, { useRef, useEffect } from 'react';
import LoadContainer from '../../shared/LoadContainer';
import './lifestyle-slider.scss';
import Slick from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: false,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 6000,
  arrows: true,
  pauseOnHover: false,
  pauseOnFocus: false,
  pauseOnDotsHover: false,
  fade: true,
  cssEase: 'linear',
  lazyLoad: 'ondemand',
  afterChange: (current) => console.log("Slide changed to:", current),
};

export default function ViewHome() {
  const slickRef = useRef(null);

  useEffect(() => {
    if (slickRef.current) {
      console.log("Slick Slider initialized:", slickRef.current);
    }
  }, []);

  return (
<LoadContainer>
  <div className="slider--container view-lifestyle-wrapper slider--transform-container">

    <Slick {...settings} ref={slickRef}>
      {[1, 2,].map((i) => {
        const num = String(i).padStart(2, "0"); // 01, 02, 03...
        return (
          <div key={i} className="slick-slide-item">
            <img
              src={`./img/lifestyle/location-lifestyle-${num}.jpg?v=200721`}
              loading={i === 1 ? "eager" : "lazy"}
              decoding="async"
              alt={`Slide ${num}`}
              draggable={false}
            />
          </div>
        );
      })}
    </Slick>
  </div>
</LoadContainer>

  );
}