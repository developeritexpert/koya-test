import React from 'react';
import ViewSlider from '../../app/components/slider/ViewSlider';
import ConnectViewGallery from './ConnectViewGallery';
import { connect } from 'react-redux';
import { selectEnlarged } from '../../shared/enlarged';

function ViewGalleryRollOver({ data, selectEnlarged }) {
    // 1. Create a global flat list of all images across datasets
    const globalEnlargedList = [];
    const globalCaptionList = [];
    const allData = [];

    data.forEach(dataset => {
        dataset.forEach(item => {
            globalEnlargedList.push(item.href);
            globalCaptionList.push(item.caption);
            allData.push(item);
        });
    });

    const isDraggable = allData.every(d => !Array.isArray(d.href));

    // 2. Build slides using each dataset (12 images per page)
    const slideList = data.map(dataset => ({
        type: 'raw',
        slide: (
            <ConnectViewGallery
                data={dataset}
                enlargedList={globalEnlargedList}
                captionList={globalCaptionList}
                isDraggable={isDraggable}
                selectEnlarged={selectEnlarged}
            />
        ),
    }));

    const settings = {
        autoplay: false,
        speed: 500,
        infinite: false,
        dotsClass: 'slick-dots slick-dots__low',
    };

    return (
        <ViewSlider className="slider--transform-container" data={{ slideList, sliderOptions: settings }} />
    );
}

const mapDispatchToProps = (dispatch) => ({
    selectEnlarged: (data) => dispatch(selectEnlarged(data)),
});

export default connect(null, mapDispatchToProps)(ViewGalleryRollOver);
