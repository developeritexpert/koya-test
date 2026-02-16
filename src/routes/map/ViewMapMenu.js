import React, { useState } from 'react';
import { data } from './dataMap';
import ConnectButtonMapItem from './ConnectButtonMapItem';
import './stylesMap.scss'
import { useSidebar } from './SidebarContext';

export default function ViewAerialMapMenu({ zoomInFunc, zoomOutFunc, showToggle = true }) {
    const [zoomInSrc, setZoomInSrc] = useState('img/interface/icon--zoom-in.png');
    const [zoomOutSrc, setZoomOutSrc] = useState('img/interface/icon--zoom-out.png');

    const menuItems = [];
    let currMenuGroup;
    let currMenuItem;
    let currIndex = 0;

    for (let i = 0; i < data.length; i++) {
        currMenuGroup = data[i].options;
        menuItems.push(
            <h2 className='aerial-map--title' key={currIndex}>{data[i].title}</h2>
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

    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <div className='aerial-map--menu'>

            {/* ✅ Toggle icon (optional) */}
            {showToggle && (
                <div className='map-sidebar-toggle-btn' onClick={toggleSidebar}>
                    <img
                        src="./toggle-sidebar.png"
                        alt="Toggle Sidebar"
                        style={{
                            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 0.5s ease-in-out'
                        }}
                    />
                </div>
            )}

            <div className='aerial-map--menu-options'>
                {menuItems}
            </div>

            <div className='aerial-map--zoom-tools'>
                <p className='aerial-map--zoom-tools--title'>Zoom</p>
                <button
                    onMouseEnter={() => setZoomInSrc('img/interface/icon--zoom-in-selected.png')}
                    onMouseOut={() => setZoomInSrc('img/interface/icon--zoom-in.png')}
                    onClick={zoomInFunc}
                >
                    <img src={zoomInSrc} width='36.25' height='36.25' alt='Zoom In icon' />
                </button>

                <button
                    onMouseEnter={() => setZoomOutSrc('img/interface/icon--zoom-out-selected.png')}
                    onMouseOut={() => setZoomOutSrc('img/interface/icon--zoom-out.png')}
                    onClick={zoomOutFunc}
                >
                    <img src={zoomOutSrc} width='36.25' height='36.25' alt='Zoom Out icon' />
                </button>
            </div>
        </div>
    );
}
