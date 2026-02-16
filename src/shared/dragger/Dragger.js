
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import DraggerSlide from './DraggerSlide';

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const Arrow = ( { type, onClick, display } ) => {
	return (
		<button className={ 'dragger--arrow-container__' + type} onClick={ () => onClick() }>
			<div 
				className={ 'dragger--arrow__' + type} 
				style={ { display: display ? 'block' : 'none' } }
			></div>
		</button>
		);
}

function Pagination ( { index, listLength, toSlideFunc } ) {
	if (listLength < 2) { return null; }
	
	const paginationDots = [];
	for (let i = 0; i < listLength; i++) {
		paginationDots.push(
			<li key={ i }>
				<button 
					className={ ( index === i ) ? 'active' : '' }
					onClick={ () => toSlideFunc(i) }
				/>
			</li>);
	}
	return (
		<div className='dragger--pagination'>
			<ul> { paginationDots } </ul> 
		</div>
	);
}

function Dragger ( { srcList, captionList, currIndex, options, onIndexChange } ) {
	const slides = [];
	const isDraggable = options.isDraggable;
	const homePosition = { x: 0, y: 0 };
	const draggable = useRef(null);
	const [velocity, setVelocity] = useState(0);

	const toSlide = (targetIndex) => {
		targetIndex = clamp( targetIndex, 0, srcList.length - 1 );
		if ( currIndex !== targetIndex )
		{
			onIndexChange( targetIndex );
		}
	};

	const previousSlide = () => toSlide( currIndex - 1 );
	const nextSlide = () => toSlide( currIndex + 1 );

	const handleDrag = (event, data) => {
		if ( Math.abs(data.deltaX) > 20 || Math.abs(data.x) > window.innerWidth/2 )
		{
			setVelocity( -5 * Math.sign(data.deltaX + data.x) );
		}
		else if ( velocity !== 0 )
		{
			setVelocity( Math.sign(velocity) * ( Math.abs(velocity) - 1 ) );
		}
	};

	const handleEnd = (event, data) => {
		setVelocity(0);
		if ( Math.sign(velocity) > 0 )
		{
			nextSlide();
		}
		else if ( Math.sign(velocity) < 0 )
		{
			previousSlide();
		}
	};

	for (let i = 0; i < srcList.length; i++) {
		let leftOffset = (i < currIndex) ? '-100%' : (i > currIndex) ? '100%' : 0;
		slides.push(
			<DraggerSlide
				key={ i }
				src={ srcList[i] }
				caption={ captionList && captionList[i] }
				show={ i === currIndex }
				options={ options.imgOptions }
				left={ leftOffset }
			/>
		);
	}

	return (
		<>
			<div className='dragger--slide-container'>
				{ slides }
			</div>
			<Draggable 
				handle='.dragger--draggable'
				axis='x'
				onDrag={ handleDrag }
				onStop={ handleEnd }
				captionList={captionList}
				disabled={ !isDraggable }
				bounds={ { left: -options.width, right: options.width*2 } }
				position={ homePosition }
				ref={ draggable }
				>
				<div className='dragger--draggable' ref={ draggable }></div>
			</Draggable>
			<Pagination
				index={ currIndex }
				listLength={ srcList.length }
				toSlideFunc={ toSlide }
			/>
			{ !options.hideButtons && (
				<>
				<Arrow 
				type='previous'
				onClick={ () => previousSlide() }
				display={ ( currIndex > 0 ) }
				/>
				<Arrow 
					type='next'
					onClick={ () => nextSlide() }
					display={ ( currIndex < srcList.length - 1 ) }
				/>
				</>
			) }
			
		</>
	);	
}



export default Dragger;