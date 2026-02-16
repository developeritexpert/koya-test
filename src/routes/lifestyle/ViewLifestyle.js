import React, { useRef, useEffect } from 'react';
import LoadContainer from '../../shared/LoadContainer';
import './lifestyle-slider.scss';
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
  arrows: false,
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
      <div className="slider--container">
        <Slick {...settings} ref={slickRef}>
          {[1, 2,].map((i) => (
            <div key={i} className="slick-slide-item">
              <img
                src={`./img/lifestyle/bkg--lifestyle-${i}.jpg?v=200721`}
                width="1920"
                height="1080"
                alt={`Slide ${i}`}
              />
            </div>
          ))}
        </Slick>
      </div>
    </LoadContainer>
  );
}
