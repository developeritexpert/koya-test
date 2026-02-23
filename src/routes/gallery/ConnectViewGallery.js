import React from 'react';
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


const onImageSelected = (localIndex) => {
    const selectedHref = data[localIndex].href;

    // Match href to find its index in the global list
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


    const getImages = () =>
        data.map((currImage, i) => (
            <GalleryItem
                key={i}
                currImage={currImage}
                i={i}
                onImageSelected={onImageSelected}
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