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
        <div className="residences--building-container">
            {/* Reserve space for title to prevent container movement */}
            <div className="residences--building-title" style={{ minHeight: '20px', textAlign: 'center' }}>
                {}
            </div>

            {/* Day/Night buttons always visible */}
            <div className="residences--building-Day-Night-container">
                <ButtonResidencesDayNight
                    data={{ title: 'Day', top: '-3px', left: '-12px' }}
                    onSelect={() => toggleDayNight('Day')}
                    selected={Day === 'Day'}
                />
                <ButtonResidencesDayNight
                    data={{ title: 'Night', top: '-3px', left: '50px' }}
                    onSelect={() => toggleDayNight('Night')}
                    selected={Day === 'Night'}
                />
            </div>
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
