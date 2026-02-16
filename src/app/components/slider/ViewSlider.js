
import React, { useRef, useEffect, useState } from 'react';
import Slick from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './stylesSlider.scss';
import Slide from './Slide';
import { connect } from 'react-redux';


const ViewSlider = ( { data, className } ) => {
    const uiColour = data.uiColour || '#b6867b';
    const { slideList, currentIndex, sliderOptions } = { slideList: [], ...data };
	const slides = [];
    const slider = useRef(null);
	const [hasSetPosition, setHasSetPosition] = useState(false);

	let settings = {
		arrows: true,
		dots: true,
		touchMove: true,
		speed: 300,
		pauseOnFocus: false,
		pauseOnHover: false,
		slidesToShow: 1,
    	slidesToScroll: 1,
		initialSlide: currentIndex,
		infinite: false,

	};


	settings = { ...settings, ...sliderOptions };

    useEffect(() => {
        if (slider.current && !hasSetPosition) {
			if (!currentIndex) {
				const resultOne = slider.current?.slickGoTo(0);
			} else {
				const resultTwo = slider.current?.slickGoTo(currentIndex);
			}

			setHasSetPosition(true);
        }
    }, [currentIndex, hasSetPosition, slider]);

	for (let i = 0; i < slideList.length; i++) {
		slides.push(
			<Slide
				key={ i }
				data={ slideList[i] }
			/>
		);
	}

    return (
        <div className={ 'slider--container ' + className } data-orig-width='1920' data-height-ratio='0.5625' style={ { color: uiColour } }>
            <Slick { ...settings } ref={ slider }>
				{ slides }
			</Slick>
        </div>
    );

}

// const mapStateToProps = (state) => ({
//     data: state.overlay.data,
// })

// export default connect(mapStateToProps)(ViewSlider);

export default ViewSlider;