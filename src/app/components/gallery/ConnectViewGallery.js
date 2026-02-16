import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectOverlaySlider } from '../overlay';
import LoadContainer from '../../../shared/LoadContainer';
import GalleryItem from './GalleryItem';
import './stylesGallery.scss';


function ConnectViewGallery ( { data, selectOverlaySlider } ) {
    const getImages = () => {
        const images = [];
        let currImage;
        for (let i = 0; i < data.length; i++) {
            currImage = data[i];
            images.push(
                <>
                    <GalleryItem key={ i } currImage={ currImage } onImageSelected={ () => onImageSelected(i) } />
                </>
            );
        }
        return images;
    }


    const slideList = [];
    const imageOptions = {maxHeight: 880};
    let isDraggable = true;

    for (let i = 0; i < data.length; i++) {
        slideList.push({
            src: data[i].href,
            caption: data[i].caption,
            options: imageOptions
        });
        // If any of these have multiple hrefs, make isDraggable false
        isDraggable = isDraggable && !Array.isArray(data[i].href);
    }

    const onImageSelected = (selectedIndex) => {
        selectOverlaySlider( { slideList: slideList, currentIndex: selectedIndex, sliderOptions: { touchMove: isDraggable } } );
    }

    return (
        <LoadContainer>
            <div className='gallery'>
                { getImages() }
            </div>
        </LoadContainer>
    );

}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    selectOverlaySlider: (data) => dispatch(selectOverlaySlider(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectViewGallery);