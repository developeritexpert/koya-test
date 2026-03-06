import React from 'react';
import ViewSlider from '../../app/components/slider/ViewSlider';
import ConnectViewGalleryLifestyle from '../../app/components/gallery/ConnectViewGalleryLifestyle';

export default function ViewGalleryLifestyle ({ data }) {
    const slideList = data.map(d => {
        return {
            type: 'raw',
            slide: <ConnectViewGalleryLifestyle data={ d } showHover={false} expand={false} />,
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