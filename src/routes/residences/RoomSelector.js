import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { addRoomSize, removeRoomSize } from '.';
import gsap from 'gsap';
function RoomSelector({ data, menuPosition, roomSizes, addRoomSize, removeRoomSize, roomSelectorVisible }) {
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);

    useEffect(() => {
        if (roomSelectorVisible) {
            if (roomSelectorRef.current) {
                roomSelectorRef.current.style.display = 'block';
            }
        } else {
            if (roomSelectorRef.current) {
                roomSelectorRef.current.style.display = 'none';
                
            }
        }
    }, [roomSelectorVisible]);
    
    useEffect(() => {
      if (menuPosition.left !== 0 && menuPosition.top !== 0) {
        if (roomSelectorRef.current) {
          const newLeft = parseInt(data.left) + 980;
  
          roomSelectorRef.current.style.left = `${newLeft}px`;
          roomSelectorRef.current.style.top = menuPosition.top;
        }
      }
    }, [menuPosition]);

      const openSubMenu = () => {

        setIsTypeMenuOpen(true);

        typeBtnRef.current.classList.add('residences--hotspot__btn-active');
        typeSubMenuRef.current.style.display = 'block';
        typeSubMenuRef.current.style.opacity = 0;
        

        gsap.to(typeSubMenuRef.current, 0.5, { top: '20px', opacity: 0.65, overwrite: true } );


      }
    
      const closeSubMenu = () => {
      
        setIsTypeMenuOpen(false);
      
        if (typeBtnRef.current) { 
          typeBtnRef.current.classList.remove('residences--hotspot__btn-active');
        }
        gsap.killTweensOf(typeSubMenuRef.current);
  
        typeSubMenuRef.current.style.display = 'none';

      }
      const getSubMenu = () => {
        const optionsList = [data.rotation];
        const levelGroups = data.levelGroups;

        for (let i = 0; i < levelGroups.length; i++) {
           const isSelected = roomSizes[0] === levelGroups[i].target;

        optionsList.push(
            <li key={i} style={{ display: 'flex', flexDirection: 'row' }}>
              <button
                className={
                  isSelected
                    ? 'residences--hotspot__sub-menu-item'
                    : 'residences--hotspot__sub-menu-item-inactive'
                }
                onClick={() => {
                  if (!isSelected) {
                    removeRoomSize(roomSizes[0]); 
                    addRoomSize(levelGroups[i].target); 
                  }
                }}
              >
                {levelGroups[i].level}
        </button>
      </li>
            );
        }
        

        return optionsList;
      }
    const typeBtnRef = useRef(null);
    const typeSubMenuRef = useRef(null);
    const roomSelectorRef = useRef(null);
    return (
    <div  className='residences--hotspot' ref={ roomSelectorRef } style={{ position: 'relative' }} >
    <button className='residences--hotspot__btn-type' ref={ typeBtnRef } onClick={ () => setTimeout(isTypeMenuOpen ? closeSubMenu : openSubMenu, 0) }>{ data.title } </button>
    <div className='residences--hotspot__sub-menu-type' ref={ typeSubMenuRef}>
        
        <ul>
          { getSubMenu() }
        </ul>
    </div> 
  </div>
  )
}


const mapStateToProps = (state) => ({
    roomSizes: state.residences.roomSizes,
    roomSelectorVisible: state.residences.roomSelectorVisible
  });

const mapDispatchToProps = (dispatch) => ({
    addRoomSize: (roomSize) => dispatch(addRoomSize(roomSize)),
    removeRoomSize: (roomSize) => dispatch(removeRoomSize(roomSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelector);