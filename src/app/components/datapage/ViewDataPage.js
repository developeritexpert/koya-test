import React from 'react';
// import { CSSTransition } from 'react-transition-group';
// import { closeOverlay } from './';
import ViewSlider from '../slider/ViewSlider';
import ReactPlayer from 'react-player/vimeo';
import ViewFloorplan from '../splitpage/ViewFloorplan';

export default function ViewDataPage ( { type, data } ) {
    switch (type) {
        case 'vr':
            return ( <div>
                <iframe 
                    src={ process.env.PUBLIC_URL + data.src } 
                    frameBorder={0} 
                    style={{overflow: 'hidden', height: data.height || (data.options.fullScreen ? '1080px' : '980px'), width: '100%'}} 
                    height="1080px" width="100%" title="3DView" />
            </div> );
            // break;
        case 'slider':
            return ( <ViewSlider data={ data } /> );
            // break;
        case 'video':
            return ( <ReactPlayer
                url={ data.src }
                playing={ true }
                controls={ true }
                width='100%' height='100%' /> );
            // break;
        case 'floorplan':
            return ( <ViewFloorplan data={data} /> );
            // break;
        // case '':
        //     ;
        //     break;
        default:
            return (<div></div>);
            // break;
    }
}