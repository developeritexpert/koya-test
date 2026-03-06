import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

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
            setTimeout( () => {
                const newWidth = img0.current.width;
                setWidth( newWidth );
                setX( newWidth/2 );
                img1.current.style.clip = `rect(0px,${ newWidth }px,9999px,${ newWidth/2 }px)`;
            }, 0 )
        });
    }, [img0, img1, x, setX, width, setWidth] );

    return (
        <>
            <div className='dragger--split-image'>
                <img src={ process.env.PUBLIC_URL + src1 } alt='media item' ref={ img0 } />
                <img src={ process.env.PUBLIC_URL + src2 } alt='media item' ref={ img1 } />
                <Draggable 
                    axis='x'
                    onDrag={ updatePercent }
                    position={ { x: x, y: 0 } }
                    bounds={ 'parent' }
                    scale={ window.innerWidth/1920 }
                    ref={ coverRef }>
                    <div className="SlideRevealCover" ref={ coverRef }>
                        <div className="SliderRevealIndicator" />
                        <div className="SliderRevealIndicatorIcon">
                            <img src={ process.env.PUBLIC_URL + iconSrc } alt='' />
                        </div>
                    </div>
                </Draggable>
            </div>
            <div className='dragger--slide-captions' style={ { color: uiColour } }>
                <span>{ caption1 }</span>
                <span>{ caption2 }</span>
            </div>
        </>
    );
}