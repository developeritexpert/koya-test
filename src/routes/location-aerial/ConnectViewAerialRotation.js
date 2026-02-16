import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { data } from './dataAerial';
import ConnectButtonAerialHotspot from './ConnectButtonAerialHotspot';


function ViewAerialRotation ( { rotation, currRotation } ) {

  const display = rotation === currRotation ? 'block' : 'none'; //only if it's the currently active rotation
  const fileRef = './img/location-aerial/bkg--aerial-rotation-0.jpg';

  const getHotspots = () => {
    const btnList = [];
    if (data.rotationHotspots[rotation] !== undefined) {
        const dataList = data.rotationHotspots[rotation]; 
        for (let i = 0; i < dataList.length; i++) { 
            btnList.push(
                <ConnectButtonAerialHotspot key={ i } data={ dataList[i] } onSelected={ onHotspotSelected } />
            );
        }
    } 
    return btnList;
  } 

  const hotspotsContainer = useRef(null);
  const onHotspotSelected = (hotspot) => {
    hotspotsContainer.current.append(hotspot); //to ensure it appears over the other hotspots
  }

  return (
      <div style={ { display: display } }  >
          <img src={ fileRef } alt='Rotation View' />
          <div className='features--hotspots-container' ref={ hotspotsContainer }>
              { getHotspots() }
          </div>
      </div>
  );

}


const mapStateToProps = (state) => ({
  currRotation: state.features.currRotation
});

export default connect(mapStateToProps)(ViewAerialRotation);