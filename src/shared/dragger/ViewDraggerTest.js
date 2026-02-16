
import React, { useRef, useEffect, useState } from 'react';
import { gsap, Draggable, InertiaPlugin, Power2 } from 'gsap/all';
import LoadContainer from '../../shared/LoadContainer';
import '../../shared/dragger/stylesDragger.scss';


export default function ViewDraggerTest ( { data } ) {

    const draggerRef = useRef(null);
    
    const slideCount = data.slideSrcList.length;
    const containerWidth = 1920;

    const [ currSlideIndex, setCurrSlideIndex ] = useState(0);

    useEffect(() => {

        // let currSlideIndex = 0; 

        gsap.registerPlugin(Draggable, InertiaPlugin);

        const onDragUpdate = () => {
            let increaseFactor;
            // if (this.handlesResize) {
            //     increaseFactor = 1;
            // } else {
                increaseFactor = containerWidth / window.innerWidth;
            // }
            let targetSlideIndex = Math.round((-(draggerRef.current.getBoundingClientRect().left * increaseFactor) ) / containerWidth);
            if (targetSlideIndex < 0) {
                targetSlideIndex = 0;
            } else if (targetSlideIndex === 0) {
                targetSlideIndex = 0;
            } else if (targetSlideIndex > slideCount) { 
                targetSlideIndex = slideCount;
            }
            if (targetSlideIndex !== currSlideIndex) {
                setCurrSlideIndex(targetSlideIndex);
                // currSlideIndex = targetSlideIndex;
                // this.checkPrevNextVisibility();
                // this.currPaginationLink.classList.remove('active');
                // this.currPaginationLink = this.paginationLinks[this.currSlideIndex];
                // this.currPaginationLink.classList.add('active');
            }
        }

        const draggable = Draggable.create(draggerRef.current, {
			type: 'x',
			bounds: { minX: 0, maxX: -(containerWidth * (slideCount-1)) },
			edgeResistance: 0.65,
			allowContextMenu: true,
			zIndexBoost: false,
			lockAxis: true,
			cursor: 'grab',
			dragClickables: false, 
			inertia: true,
			snap: {
				x: (endValue) => Math.round(endValue / containerWidth) * containerWidth
			},
			throwResistance: 100,
			maxDuration: 0.5,
			onDrag: onDragUpdate,
			onDragEnd: function () {
                const currVelocity = InertiaPlugin.getVelocity(this.target, 'x');
				let isSwipe = false;
				let targetIndex; 
				if (currVelocity > 20) {
					if (currSlideIndex > 0) {
						targetIndex = currSlideIndex-1;
						isSwipe = true;
					}
				} else if (currVelocity < -20) {
					if (currSlideIndex < (slideCount-1)) {
						targetIndex = currSlideIndex+1;
						isSwipe = true;
					}
				}
				if (isSwipe) {
					gsap.to(draggerRef.current, this.tween.duration(), { x: -(targetIndex * containerWidth), onUpdate: onDragUpdate } );
				}
			}
        })[0];

    });

    const getSlides = () => {
        const slides = [];
        let currData;
        for (let i = 0; i < data.slideSrcList.length; i++) {
            currData = data.slideSrcList[i];
            slides.push(
                <div className='dragger--slide' key={ i } style={ { left: (i * containerWidth) + 'px', width: '1920px' } }>
                    <img src={ currData } alt='media item' width='1920' height='1080' />
                </div>
            );
        }
        return slides;
    }


    const getPagination = () => {
        const pagination = [];
        for (let i = 0; i < data.slideSrcList.length; i++) {
            pagination.push(
                <li key={ i }>
                    <a href='#to-media' onClick={ () => console.log('oi') }>To slide</a>
                </li>
            );
        }
        return pagination;
    }


    return (
        <LoadContainer>
            <div className='dragger--container'>
                <div className='dragger--draggable' ref={ draggerRef }>
                    { getSlides() }
                </div>
                <div className='dragger--pagination'>
                    <ul>
                        { getPagination() }
                    </ul>
                </div>
            </div>
        </LoadContainer>
    );

}
