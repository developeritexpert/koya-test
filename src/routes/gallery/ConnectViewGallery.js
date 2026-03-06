import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectEnlarged } from '../../shared/enlarged/';
import LoadContainer from '../../shared/LoadContainer';
import './gallery.scss';
import GalleryItem from '../../app/components/gallery/GalleryItem';


function ConnectViewGallery({
    data = [],
    enlargedList = [],
    captionList = [],
    isDraggable = true,
    selectEnlarged
}) {

const [lastTapped, setLastTapped] = useState(null);


// reset tap when tapping elsewhere
useEffect(() => {
    const handleOutsideTap = () => setLastTapped(null);

    document.addEventListener('pointerdown', handleOutsideTap);

    return () => {
        document.removeEventListener('pointerdown', handleOutsideTap);
    };
}, []);




const onImageSelected = (localIndex) => {

    const selectedHref = data[localIndex].href;

    const globalIndex = enlargedList.findIndex(href => href === selectedHref);

    if (globalIndex === -1) {
        console.warn("Could not find image in enlargedList:", selectedHref);
        return;
    }

    selectEnlarged({
        srcList: enlargedList,
        captionList: captionList,
        currSrcIndex: globalIndex,
        options: { maxHeight: 880 },
        isDraggable: isDraggable,
    });

};



// NEW: double tap logic
const handlePointerDown = (index, e) => {

    if (!('ontouchstart' in window)) return;

    e.stopPropagation();

    if (lastTapped !== index) {

        // first tap
        setLastTapped(index);

    } else {

        // second tap
        onImageSelected(index);
        setLastTapped(null);

    }
};



const getImages = () =>
    data.map((currImage, i) => (
        <GalleryItem
            key={i}
            currImage={currImage}
            i={i}

            // ORIGINAL functionality untouched
            onImageSelected={onImageSelected}

            // NEW double tap support
            onPointerDown={(e) => handlePointerDown(i, e)}
        />
    ));




return (
    <LoadContainer>
        <div className='gallery__images'>
            {getImages()}
        </div>
    </LoadContainer>
);
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    selectEnlarged: (data) => dispatch(selectEnlarged(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectViewGallery);