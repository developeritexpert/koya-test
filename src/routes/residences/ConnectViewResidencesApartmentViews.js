import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { selectEnlarged } from '../../shared/enlarged/';
import { data } from './dataResidences';
import { gsap } from 'gsap/all';


function ViewResidencesApartmentViews ( { residences, selectEnlarged } ) {

    const menuRef = useRef(null);
    const btnRef = useRef(null);
    const menuHeightRef = useRef(null);
    const dataList = data.apartmentTypes[residences.apartment];
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (dataList.length > 22) {
            menuHeightRef.current = 600;
        } else {
            menuHeightRef.current = 300;
        }
        menuRef.current.style.height = menuHeightRef.current + 'px';
        menuRef.current.style.bottom = '-' + (menuHeightRef.current - 40) + 'px'; //to just show the open/close button
    }, []);



    const getThumbs = () => {
        const optionsList = [];

        for (let i = 0; i < dataList.length; i++) {
                // If any of these have multiple hrefs, make isDraggable false
            
            optionsList.push(
                <li key={i} className='residences--apartment__views-tmb'>
                    { dataList[i]?.showDay ? (
                         <button onClick={ () => onThumbSelected('/img/views/' + dataList[i].viewSrc + '-night.jpg', '/img/views/' + dataList[i].viewSrc + '-day.jpg', dataList[i]?.caption) }>
                         <h2>{ dataList[i].title }</h2>
                         <img src={ './img/views/tmb/' + dataList[i].viewSrc + '-night-tmb.jpg' } alt='view thumbnail' />
                     </button>
                    ): (
                         <button onClick={ () => onThumbSelected('/img/views/' + dataList[i].viewSrc + '-night.jpg', undefined, dataList[i]?.caption) }>
                         <h2>{ dataList[i].title }</h2>
                         <img src={ './img/views/tmb/' + dataList[i].viewSrc + '-night-tmb.jpg' } alt='view thumbnail' />
                     </button>
                    )}
                   
                </li>
            );
        }
        return optionsList;
    }

    const onThumbSelected = (enlargedSrcNight, enlargedSrcDay,captionList,) => {
        console.log('enlargedSrcNight', enlargedSrcNight);
        console.log('enlargedSrcDay', enlargedSrcDay);
        if (enlargedSrcDay === undefined) { 
            console.log('<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>');

            selectEnlarged( { srcList: [enlargedSrcNight], currSrcIndex: 0, dayEnlarged: 'Night', captionList: captionList, showDayNightButtons:false, isHidden: true} );
        } else {
            console.log('????????????????????????????????????');

            selectEnlarged( { srcList: [enlargedSrcNight, enlargedSrcDay ], currSrcIndex: 0, dayEnlarged: 'Night', showDayNightButtons: true,  isDraggable: false, captionList: captionList, isHidden: true} );
        }
    }

    const toggleMenu = () => {
        if (isOpen) {
            setIsOpen(false);
            btnRef.current.innerHTML = '<div class="view-toggle-btn"><img style="transition: 0.5s" src="./down-arrow.png" alt="Toggle Icon" height="auto" width="20px"/> VIEWS</div>';
            gsap.to(menuRef.current, 0.3, { bottom: '-' + (menuHeightRef.current - 20) + 'px', overwrite: true } ); //to just show the open/close button
        } else {
            setIsOpen(true);
            btnRef.current.innerHTML = '<div class="view-toggle-btn"><img style="transform: rotate(0deg); transition: 0.5s" src="./down-arrow.png" alt="Toggle Icon" height="auto" width="20px"/> VIEWS</div>';
            gsap.to(menuRef.current, 0.3, { bottom: '0px', overwrite: true } );
        }
    }

    return (
        <div className='residences--apartment__views' ref={ menuRef }>
            <button className='residences--apartment__views-btn' ref={ btnRef } onClick={ toggleMenu }>
                <div className="view-toggle-btn">
                    <img style={{transition:'0.4s'}}
                     src="./down-arrow.png" alt="Toggle Icon" height="auto" width="20px"/> 
                    VIEWS
                </div>
            </button>
            <ul className='residences--apartment__views-tmbs'>
                { getThumbs() }
            </ul>
        </div>
    );

}


const mapStateToProps = (state) => ({
    residences: state.residences,
    enlarged: state.enlarged,
    dayEnlarged: state.enlarged.dayEnlarged,
})

const mapDispatchToProps = (dispatch) => ({
    selectEnlarged: (data) => dispatch(selectEnlarged(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewResidencesApartmentViews)