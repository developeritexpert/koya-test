import React, { useState } from 'react';
import { data } from './dataMap';
import ConnectButtonMapItem from './ConnectButtonMapItem';
import './stylesMap.scss'
import { useSidebar } from './SidebarContext';

export default function ViewAerialMapMenu({ zoomInFunc, zoomOutFunc, showToggle = true }) {

    const [isZoomedIn, setIsZoomedIn] = useState(false);

    const handleZoomIn = () => {
    if (!isZoomedIn) {
        zoomInFunc();
        setIsZoomedIn(true);
    }
    };

    const handleZoomOut = () => {
        if (isZoomedIn) {
            zoomOutFunc();
            setIsZoomedIn(false);
        }
    };

    const menuItems = [];
    let currMenuGroup;
    let currMenuItem;
    let currIndex = 0;
    let buttonIndex = 0;

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
                <ConnectButtonMapItem key={currIndex} item={currMenuItem.title} index={buttonIndex} />
            );
            currIndex++;
            buttonIndex++;
        }
    }

    return (
        <div className='aerial-map--menu'>
            <div className='aerial-map--menu-options'>
                {menuItems}
            </div>

            <div className='aerial-map--zoom-tools'>
                <button
                    onClick={handleZoomOut}
                    disabled={!isZoomedIn}
                    className={!isZoomedIn ? 'disabled' : ''}
                >
                    <img src="img/interface/icon-zoom-out-white.png" width='36.25' height='36.25' alt='Zoom Out icon' />
                </button>
                <button
                    onClick={handleZoomIn}
                    disabled={isZoomedIn}
                    className={isZoomedIn ? 'disabled' : ''}
                >
                    <img src="img/interface/icon-zoom-in-white.png" width='36.25' height='36.25' alt='Zoom In icon' />
                </button>
            </div>
        </div>
    );
}
