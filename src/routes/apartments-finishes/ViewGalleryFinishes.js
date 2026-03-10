import React from 'react';
import ViewSlider from '../../app/components/slider/ViewSlider';
import ConnectViewGalleryFinishes from '../../app/components/gallery/ConnectViewGalleryInteriorFinishes';

export default function ViewGalleryFinishes ({ data }) {
    const slideList = data.map(d => {
        return {
            type: 'raw',
            slide: <ConnectViewGalleryFinishes data={ d } showHover={false} expand={false} />,
        }
    });


    const settings = {
        autoplay: false,
		speed: 500,
		infinite: false,
        dotsClass: 'slick-dots slick-dots__low',
	};

    return (
        <ViewSlider lightBackground={true} className="slider--transform-container" data={ { slideList: slideList, sliderOptions: settings } } />
    );

}