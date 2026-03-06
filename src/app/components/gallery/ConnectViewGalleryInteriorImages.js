import React from 'react';
import { connect } from 'react-redux';
import { selectOverlaySlider } from '../overlay';
import LoadContainer from '../../../shared/LoadContainer';
import './stylesGallery.scss';


function ConnectViewGalleryInteriorImages({ data, selectOverlaySlider, showHover = true, expand = true }) {

    const getImages = () => {
        const images = [];
        let currImage;
        for (let i = 0; i < data.length; i++) {
            currImage = data[i];
            images.push(
                <button key={i} className={`gallery--image--no-hover ${showHover ? '' : 'no-hover'}`} style={{ left: currImage.left, top: currImage.top }} onClick={() => expand ? onImageSelected(i) : null}>
                    <img style={{ width: currImage.width, height: currImage.height }} src={process.env.PUBLIC_URL + currImage.src} alt={currImage.title} />
                </button>
            );
        }
        return images;
    }


    let slideList = [];
    const imageOptions = { maxHeight: 880 };
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
        selectOverlaySlider({ slideList: slideList, currentIndex: selectedIndex, sliderOptions: { touchMove: isDraggable } });
    }

    return (
        <div className='gallery'>
            {getImages()}
        </div>
    );

}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    selectOverlaySlider: (data) => dispatch(selectOverlaySlider(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectViewGalleryInteriorImages);