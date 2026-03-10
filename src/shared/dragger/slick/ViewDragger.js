
import React from 'react';
import Dragger from './Dragger';
import './stylesDragger.scss';

export default function ViewDragger ( { data } ) {
    const isDraggable = data.hasOwnProperty('isDraggable') ? data.isDraggable : true
    const uiColour = data.uiColour || '#FFFFFF';

    return (
        <div className='dragger--container' data-orig-width='1920' data-height-ratio='0.5625' style={ { color: uiColour } }>
            <Dragger
                srcList={ data.srcList }
				captionList={ data.captionList }
                currentIndex={ data.currSrcIndex }
                isDraggable={ isDraggable }
                imgOptions={ data.imgOptions }
            />
        </div>
    );

}