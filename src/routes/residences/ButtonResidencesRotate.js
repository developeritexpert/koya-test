
import React from 'react';


export default function ButtonResidencesRotate ( { className, imgRef, onSelected } ) {
    return (
        <button className={ className } onClick={ onSelected }><img src={ imgRef } width='23' height='32' alt='rotate button' /></button>
    );
}
