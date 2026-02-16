
import React from 'react';


export default function ButtonResidencesRotate ( { className, imgRef, onSelected } ) {
    return (
        <button className={ className } onClick={ onSelected }><img src={ imgRef } width='50' height='50' alt='rotate button' /></button>
    );
}
