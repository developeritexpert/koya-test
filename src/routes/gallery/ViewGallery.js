import React from 'react';
import ViewSlider from '../../app/components/slider/ViewSlider';
import ConnectViewGallery from '../gallery/ConnectViewGallery';

export default function ViewGallery({ data }) {
    // Flatten ALL images across pages
    const flattenedData = data.flat();
    const enlargedList = flattenedData.map(item => item.href);
    const captionList = flattenedData.map(item => item.caption);
    const isDraggable = flattenedData.every(item => !Array.isArray(item.href));

    // Map original pages to slides
    const slideList = data.map((d, pageIndex) => ({
        type: 'raw',
        slide: (
            <ConnectViewGallery
                key={pageIndex}
                data={d}
                enlargedList={enlargedList}
                captionList={captionList}
                isDraggable={isDraggable}
            />
        )
    }));

    const settings = {
        autoplay: false,
        speed: 500,
        infinite: false,
        dotsClass: 'slick-dots slick-dots__low',
    };

    return (
        <ViewSlider
            className="slider--transform-container"
            data={{ slideList: slideList, sliderOptions: settings }}
        />
    );
}
