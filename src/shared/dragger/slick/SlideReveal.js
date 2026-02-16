import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import './stylesSlideReveal.scss'

export default function SlideReveal ( { src1, src2, caption1, caption2, uiColour, imgsRef } ) {
    const iconSrc = '/img/interface/btn-slide2.png';
    const img0 = imgsRef[0];
    const img1 = imgsRef[1];
    const coverRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [x, setX] = useState(0);

    const updatePercent = (event, data) => {
        setX(data.x);
        img1.current.style.clip = `rect(0px,${ width }px,9999px,${ x }px)`;
    };

    useEffect( () => {
        img0.current.addEventListener('load', () => {
            const newWidth = img0.current.width;
            setWidth( newWidth );
            setX( newWidth/2 );
            img1.current.style.clip = `rect(0px,${ newWidth }px,9999px,${ newWidth/2 }px)`;
        });
    }, [img0, img1, x, setX, width, setWidth] );

    return (
        <>
            <div className='slide_reveal--split-image'>
                <img src={ src1 } alt='media item' ref={ img0 } />
                <img src={ src2 } alt='media item' ref={ img1 } />
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
            <div className='slide-captions' style={ { color: uiColour } }>
                <span>{ caption1 }</span>
                <span>{ caption2 }</span>
            </div>
        </>
    );
}