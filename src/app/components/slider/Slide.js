import React, { useRef, useState } from 'react';
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

function SliderSlide ( { data } ) {
    const img = useRef(null);
    const [slide, setSlide] = useState(null);

    const slideLoaded = () => {
        if (data.options && ( data.options.hasOwnProperty('maxHeight') || data.options.hasOwnProperty('maxWidth') ) )
        {
            imgResize(img.current, data.options.maxHeight, data.options.maxWidth);
        }
        if (slide)
        {
            utilAnimate.fadeIn(slide)
        }
    }

    if (!slide)
    {
        switch (data.type) {
            case 'raw':
                setSlide( data.slide );
                slideLoaded();
                break;
            case 'vimeo' || 'video':
                setSlide(createVimeoSlide(data.src));
                slideLoaded();
                break;
            case 'reveal':
                setSlide(
                    <SlideReveal 
                        data={ data }
                        imgRef={ img }
                        onLoad={ slideLoaded } />
                );
                break;
            default:
                if (data.src)
                {
                    const src = ( ( data.options && data.options.ignorePublicURL ) ? '' : process.env.PUBLIC_URL ) + data.src;
                    setSlide( <img src={ src } alt='media item' ref={ img } onLoad={ slideLoaded } /> );
                }
                break;
        }
    }

    return slide;
}

export default SliderSlide;