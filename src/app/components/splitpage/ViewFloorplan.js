import React, { useEffect, useState } from 'react';
import ViewSplitPage from './ViewSplitPage';


export default function ViewFloorplan ( { data } ) {
    const [imgState, setImgState] = useState({});

    const getImgState = () => ( imgState.level || 'level' ) + ( imgState.version || '' );

    const partialStateMatch = (partialState) => {
        for (const [key, value] of Object.entries(partialState)) {
            if (imgState[key] !== value) {
                return false;
            }
        }
        return true;
    }

    const generateImage = () => {
        const backgroundImageSrc = process.env.PUBLIC_URL + ( typeof data.imgBkg === 'object' ? data.imgBkg[getImgState()] : data.imgBkg );
        const overlayImageSrc = process.env.PUBLIC_URL + ( typeof data.imgOverlay === 'object' ? data.imgOverlay[getImgState()] : data.imgOverlay );
        
        const backgroundImage = data.imgBkg ? (<img className='floorplan--image-background' src={ backgroundImageSrc } alt='' />) : (<></>);
        const overlayImage = data.imgOverlay ? (<img className='floorplan--image-background' src={ overlayImageSrc } alt='' />) : (<></>);

        return (
            <div className='floorplan--layer-image-container'>
                { backgroundImage }
                <img className='floorplan--layer-image' 
                    src={ process.env.PUBLIC_URL + ( typeof data.img === 'object' ? data.img[getImgState()] : data.img ) } alt='' />
                { overlayImage }
            </div>
        );
    }

    const pageContents = [];
    for (let idx=0; idx<data.pageContents.length; idx++)
    {
        const pageContent = data.pageContents[idx];
        switch (pageContent.type) {
            case 'title':
                pageContents.push(<h1 className='title floorplan--title' key={ idx } dangerouslySetInnerHTML={{ __html: pageContent.text }}></h1>);
                break;
            case 'statement':
                pageContents.push(<p className='statement floorplan--statement' key={ idx }>{pageContent.text}</p>);
                break;
            case 'spacer':
                pageContents.push(
                    <div className='spacer floorplan--spacer' key={ idx } 
                        style={ { height: pageContent.height || 'auto', width: pageContent.width || 'auto' } }></div>
                    );
                break;
            case 'button':
                let buttonActive = partialStateMatch(pageContent.state) ? '__active' : '';
                pageContents.push(
                    <button className={ `button${ buttonActive } floorplan--button${ buttonActive }` }
                        onClick={ () => setImgState( { ...imgState, ...pageContent.state } ) }
                        key={ idx }>
                        {pageContent.text}
                    </button>
                    );
                break;
            default:
                break;
        }
    }

    const pageContent = (
        <div className='copy-container floorplan--copy-container'>
            { pageContents }
        </div>
    );

    useEffect( () => {
        let newState = {};
        for (let idx=0; idx<data.pageContents.length; idx++)
        {
            const pageContentState = data.pageContents[idx].state || {};
            newState = { ...pageContentState, ...newState };
        }
        setImgState(newState)
    }, [data.pageContents] );

    return (
        <ViewSplitPage
            className={ 'floorplan ' + (data.className ? data.className : '') }
            pageLeft={ pageContent }
            pageRight={ generateImage() } />
    );
}