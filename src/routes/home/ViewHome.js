import React, { useRef, useEffect } from 'react';
import LoadContainer from '../../shared/LoadContainer';
import './home-slider.scss';
import Slick from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const settings = {
  dots: true,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
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
  <div className="slider--container home-page-slider">
    <Slick {...settings} ref={slickRef}>
      {[1, 2, 3, 4].map((i) => {
        const num = String(i).padStart(2, "0"); // 01, 02, 03...
        return (
          <div key={i} className="slick-slide-item">
            <img
              src={`./img/home/home-${num}.jpg?v=200721`}
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