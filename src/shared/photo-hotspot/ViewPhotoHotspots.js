
import React, { useRef } from 'react';
import ConnectButtonAmenitiesHotspot from './ConnectButtonPhotoHotspot'


function ViewPhotoHotspots ( { data } ) {

    const getHotspots = () => {
        const btnList = [];
        for (let i = 0; i < data.length; i++) { 
            btnList.push(
                <ConnectButtonAmenitiesHotspot key={ i } data={ data[i] } onSelected={ onHotspotSelected } />
            );
        }
        return btnList;
    } 
    
    const hotspotsContainer = useRef(null);
    const onHotspotSelected = (hotspot) => {
        hotspotsContainer.current.append(hotspot); //to ensure it appears over the other hotspots
    }

    return (
        <div ref={ hotspotsContainer }>
            { getHotspots() }
        </div>
    );

}

export default ViewPhotoHotspots;