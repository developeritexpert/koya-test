
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DraggerSlide from './DraggerSlide';

function Dragger ( { srcList, captionList, currentIndex, isDraggable, imgOptions } ) {
	const slides = [];
	const settings = {
		dots: true,
		touchMove: isDraggable,
		speed: 300,
		slidesToShow: 1,
    	slidesToScroll: 1,
		initialSlide: currentIndex || 0,
		infinite: false,
	};

	for (let i = 0; i < srcList.length; i++) {
		slides.push(
			<DraggerSlide
				key={ i }
				src={ srcList[i] }
				caption={ captionList && captionList[i] }
				options={ imgOptions }
			/>
		);
	}

	return (
		<>
			<Slider { ...settings }>
				{ slides }
			</Slider>
		</>
	);	
}



export default Dragger;