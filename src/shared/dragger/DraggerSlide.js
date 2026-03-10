import React, { useRef, useEffect, useState } from 'react';
import { utilAnimate } from '../../util/utilAnimate';
import SlideReveal from './SlideReveal';
//import ViewSlider from '../../app/components/slider/Backup/ViewSlider';


function createVimeoSlide (src) {
    return ( <iframe src={ src } width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen title='blank'></iframe> );
}

function imgResize ( img, maxHeight, maxWidth ) {
    const containerRatio = 16/9;
    const imgRatio = img.width/img.height;
    maxHeight = maxHeight || 1080;
    maxWidth = maxWidth || maxHeight * containerRatio;

    if ( imgRatio >= containerRatio )
    {
        img.width = (img.width > (maxWidth)) ? maxWidth : img.width ;
        img.height = img.width / imgRatio;
    }
    else
    {
        img.height = (img.height > maxHeight) ? maxHeight : img.height ;
        img.width = img.height * imgRatio;
    }
}

function DraggerSlide ( { src, caption, show, options, left } ) {
    const slideContainer = useRef(null);
    const imgs = [useRef(null), useRef(null)];
    const [slide, setSlide] = useState(null);
    const [showing, setShowing] = useState(show);
    const [loaded, setLoaded] = useState(false);
 

    if (show !== showing)
    {
        
        if ( slideContainer.current )
        {
            if (show && loaded) { utilAnimate.fadeIn(slideContainer.current); }
            else { utilAnimate.fadeOut(slideContainer.current); }
        }
        setShowing(show);
    }

    useEffect( () => {
        if (!slide && show)
        {
            if ( Array.isArray(src) && src.length === 2 )
            {
                setSlide(
                    <SlideReveal 
                        src1={src[0]} 
                        src2={src[1]} 
                        caption1={ ( caption && caption[0] ) || 'Option A' } 
                        caption2={ ( caption && caption[1] ) || 'Option B' }
                        imgsRef={ imgs }
                    />
                );
            }
            else {
                setSlide(
                    <>
                        <img src={process.env.PUBLIC_URL + src} alt='media item' ref={imgs[0]} />
                        {/* Caption for a single image */}
                        <div className='dragger--slide-captions'>
                            <span>{caption || 'Indicative view, subject to change. '}</span>
                        </div>
                    </>
                );
        }
    }
        if (imgs[0].current)
        {

            imgs[0].current.addEventListener('load', () => {
                if (options && ( options.hasOwnProperty('maxHeight') || options.hasOwnProperty('maxWidth') ) )
                {
                    imgResize(imgs[0].current, options.maxHeight, options.maxWidth);
                }
                if ( slideContainer.current && ( !imgs[1].current || imgs[1].current.complete ) )
                {
                    if (show) { utilAnimate.fadeIn(slideContainer.current); }
                    else { utilAnimate.fadeOut(slideContainer.current); }
                    setLoaded(true);
                    setShowing(show);
                }
                else 
                {
                    imgs[1].current.addEventListener('load', () => {
                        if ( slideContainer.current )
                        {
                            if (show) { utilAnimate.fadeIn(slideContainer.current); }
                            else { utilAnimate.fadeOut(slideContainer.current); }
                            setShowing(show);
                        }
                        setLoaded(true);
                        
                    });
                }
            });
        }

    }, [src, caption, imgs, slide, options, slideContainer, show, setLoaded, setShowing] );

    return (
        <div className='dragger--slide' style={ { left: left } }>
            <div className='dragger--slide-inner-container' ref={ slideContainer } >
                { slide }
            </div>
        </div>
    );
}

export default DraggerSlide;