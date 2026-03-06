import React, { useState } from "react";
import { connect } from 'react-redux'
import { toggleNight, toggleDay } from ".";
import ButtonResidencesDayNight from '../../routes/residences/ButtonResidencesDayNight';
const ConnectViewDayNight = ({ toggleDay, toggleNight, dayEnlarged }) => {

    return (            <div className="residences--building-container"  style={{ left: '1500px', top: '30px'}}>

                <div className="residences--building-Day-Night-container">
                    <ButtonResidencesDayNight data={{ title: 'Night', top: '-3px', left: '-2px' }} onSelect={() => toggleNight()} selected={dayEnlarged === 'Night'}/>
                    <ButtonResidencesDayNight data={{ title: 'Day', top: '-3px', left: '58px' }} onSelect={() => toggleDay()} selected={dayEnlarged === 'Day'}/>
                </div>
            </div> );
}



const mapStateToProps = (state) => ({
    dayEnlarged: state.enlarged.data.dayEnlarged,
  })

  const mapDispatchToProps = (dispatch) => ({
    toggleDay: () => dispatch(toggleDay()),
    toggleNight: () => dispatch(toggleNight()),
  })

  export default connect(mapStateToProps, mapDispatchToProps)(ConnectViewDayNight)