import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import './stylesSlideReveal.scss'

export default function SlideReveal ( { data, imgRef, onLoad } ) {
    const iconSrc = '/img/interface/btn-slide2.png';
    const imgLeft = imgRef;
    const imgRight = useRef(null);
    const coverRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [x, setX] = useState(0);

    const updatePercent = (event, eventData) => {
        setX(eventData.x);
        imgRight.current.style.clip = `rect(0px,${ width }px,9999px,${ x }px)`;
    };

    const leftImageLoad = () => {
        const newWidth = imgLeft.current.width;
        setWidth( newWidth );
        setX( newWidth/2 );
        imgRight.current.style.clip = `rect(0px,${ newWidth }px,9999px,${ newWidth/2 }px)`;

        callOnLoad();
    }

    const callOnLoad = () => {
        if ( imgLeft.current.complete && imgRight.current.complete ) {
            onLoad();
        }
    }

    return (
        <>
            <div className='slide_reveal--split-image'>
                <img src={ process.env.PUBLIC_URL + data.src[0] } alt='media item' onLoad={ leftImageLoad } ref={ imgLeft } />
                <img src={ process.env.PUBLIC_URL + data.src[1] } alt='media item' onLoad={ callOnLoad } ref={ imgRight } />
                <Draggable 
                    axis='x'
                    onDrag={ updatePercent }
                    position={ { x: x, y: 0 } }
                    bounds={ 'parent' }
                    ref={ coverRef }>
                    <div className="slide_reveal--cover" ref={ coverRef }>
                        <div className="slide_reveal--indicator" />
                        <div className="slide_reveal--indicator-icon">
                            <img src={ process.env.PUBLIC_URL + iconSrc } alt='' />
                        </div>
                    </div>
                </Draggable>
            </div>
            <div className='slide-captions' style={ { color: data.uiColour } }>
                <span>{ ( data.caption && data.caption[0] ) || 'Option A' }</span>
                <span>{ ( data.caption && data.caption[1] ) || 'Option B' }</span>
            </div>
        </>
    );
}