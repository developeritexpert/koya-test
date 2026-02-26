import React, { useState } from 'react';
import { data } from './dataMap';
import ConnectButtonMapItem from './ConnectButtonMapItem';
import './stylesMap.scss'
import { useSidebar } from './SidebarContext';

export default function ViewAerialMapMenu({ zoomInFunc, zoomOutFunc, showToggle = true }) {
    const [zoomInSrc, setZoomInSrc] = useState('img/interface/icon-zoom-in-white.png');
    const [zoomOutSrc, setZoomOutSrc] = useState('img/interface/icon-zoom-out-white.png');

    const menuItems = [];
    let currMenuGroup;
    let currMenuItem;
    let currIndex = 0;

    for (let i = 0; i < data.length; i++) {
        currMenuGroup = data[i].options;
        menuItems.push(
            <>  
            <h2 className='aerial-map--title' key={currIndex}>{data[i].title}</h2>
            <div className="aerial-map-title-divider"></div>
            </>
        );
        currIndex++;
        for (let j = 0; j < currMenuGroup.length; j++) {
            currMenuItem = currMenuGroup[j];
            menuItems.push(
                <ConnectButtonMapItem key={currIndex} item={currMenuItem.title} />
            );
            currIndex++;
        }
    }

    return (
        <div className='aerial-map--menu'>
            <div className='aerial-map--menu-options'>
                {menuItems}
            </div>

            <div className='aerial-map--zoom-tools'>
                <button
                    // onMouseEnter={() => setZoomOutSrc('img/interface/icon--zoom-out-selected.png')}
                    // onMouseOut={() => setZoomOutSrc('img/interface/icon--zoom-out.png')}
                    onClick={zoomOutFunc}
                >
                    <img src={zoomOutSrc} width='36.25' height='36.25' alt='Zoom Out icon' />
                </button>
                <button
                    // onMouseEnter={() => setZoomInSrc('img/interface/icon--zoom-in-selected.png')}
                    // onMouseOut={() => setZoomInSrc('img/interface/icon--zoom-in.png')}
                    onClick={zoomInFunc}
                >
                    <img src={zoomInSrc} width='36.25' height='36.25' alt='Zoom In icon' />
                </button>
            </div>
        </div>
    );
}
