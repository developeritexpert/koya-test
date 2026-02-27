import React from "react";
import { connect } from 'react-redux';
import { toggleDayNight } from ".";
import ButtonResidencesDayNight from './ButtonResidencesDayNight';

const ConnectViewResidencesDayNight = ({ currRotation, toggleDayNight, Day }) => {
    const renderTitle = () => {
        const rotation = Math.round(currRotation);
        if (rotation === 0) return '';
        if (rotation === 18) return '';
        if (rotation === 36) return '';
        if (rotation === 54) return '';
        return ''; // Empty string to preserve layout
    }

    const title = renderTitle();

    return (
        <div className="residences--building-day-night-container">
            {/* Day/Night buttons always visible */}
              <ButtonResidencesDayNight
                    data={{ title: 'Day',  imgSrc: 'img/interface/icon-sun-white.png'}}
                    onSelect={() => toggleDayNight('Day')}
                    selected={Day === 'Day'}
                />
                <ButtonResidencesDayNight
                    data={{ title: 'Night', imgSrc: 'img/interface/icon-moon-white.png' }}
                    onSelect={() => toggleDayNight('Night')}
                    selected={Day === 'Night'}
                />
        </div>
    );
}

const mapStateToProps = (state) => ({
    currRotation: state.residences.currRotation,
    Day: state.residences.Day,
});

const mapDispatchToProps = (dispatch) => ({
    toggleDayNight: (Day) => dispatch(toggleDayNight(Day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectViewResidencesDayNight);
