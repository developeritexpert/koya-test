
import React, { useEffect, useState } from 'react';
import Dragger from './Dragger';
import './stylesDragger.scss';

export default function ViewDragger ( { data, /*hideButtons = false*/ } ) {

	const width = window.innerWidth * data.srcList.length;
    const isDraggable = data.hasOwnProperty('isDraggable') ? data.isDraggable : true
    const uiColour = data.uiColour || '#FFFFFF';
	const [index, setIndex] = useState( data.currSrcIndex || 0 );
    const isHidden = data.hasOwnProperty('isHidden') ? data.isHidden : false


    useEffect(() => {
        setIndex(data.currSrcIndex);
    }, [data.currSrcIndex]);

    const options = {
        imgOptions: data.options,
        handlesResize: false,
        width: window.innerWidth,
        isDraggable: isDraggable,
        hideButtons: isHidden,
    }

    return (
        <div className='dragger--container' data-orig-width='1920' data-height-ratio='0.5625' style={ { color: uiColour } }>
            <Dragger
                srcList={ data.srcList }
				captionList={ data.captionList }
                currIndex={ index }
                options={ options }
                width={ width }
				onIndexChange={ (idx) => setIndex(idx) }
            />
        </div>
    );

}