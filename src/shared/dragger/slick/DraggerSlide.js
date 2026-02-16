import React, { useRef, useEffect, useState } from 'react';
import SlideReveal from './SlideReveal';
import { utilAnimate } from '../../../util/utilAnimate';

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

function DraggerSlide ( { src, caption, options } ) {
    const isSlideReveal = ( Array.isArray(src) && src.length === 2 );
    const imgs = [useRef(null), useRef(null)];
    const [slide, setSlide] = useState(null);

    if (!slide)
    {
        if ( !isSlideReveal )
        {
            setSlide( <img src={ src } alt='media item' ref={ imgs[0] } /> );
        }
        else
        {
            setSlide(
                <SlideReveal 
                    src1={src[0]} 
                    src2={src[1]} 
                    caption1={ ( caption && caption[0] ) || 'Light' } 
                    caption2={ ( caption && caption[1] ) || 'Dark' }
                    imgsRef={ imgs }
                />
            );
        }
        
    }

    useEffect( () => {
        imgs[0].current.addEventListener('load', () => {
            if (options && ( options.hasOwnProperty('maxHeight') || options.hasOwnProperty('maxWidth') ) )
            {
                imgResize(imgs[0].current, options.maxHeight, options.maxWidth);
            }
            if (slide.current)
            {
                utilAnimate.fadeIn(slide.current)
            }
        } );

    }, [imgs, slide, options] )

    return slide;
}

export default DraggerSlide;