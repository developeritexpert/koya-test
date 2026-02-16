
import React from 'react';
import ConnectViewAerialRotation from './ConnectViewAerialRotation';
import ConnectViewAerialUIRotate from './ConnectViewAerialUIRotate';
import LoadContainer from '../../shared/LoadContainer';
import './stylesFeatures.scss';


export default function ViewLocationAerial () {
    
    const rotations = [];
    for (let i = 0; i <= 72; i++) { 
        rotations.push(
            <ConnectViewAerialRotation key={ i } rotation={ i } />
        );
    }

    return (
        <LoadContainer>
            <div className='features--rotations'> 
                { rotations }
            </div>
        </LoadContainer>
    );

}