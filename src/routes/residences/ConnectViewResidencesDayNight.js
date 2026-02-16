import React from "react";
import { connect } from 'react-redux';
import { toggleDayNight } from ".";
import ButtonResidencesDayNight from './ButtonResidencesDayNight';

const ConnectViewResidencesDayNight = ({ currRotation, toggleDayNight, Day }) => {
    const renderTitle = () => {
        if (currRotation === 0) return 'Tower 2';
        if (currRotation === 18) return 'Tower 1';
        if (currRotation === 36) return 'Tower 4';
        if (currRotation === 54) return 'Tower 3';
        return null;
    }

    return renderTitle() && (
        <div className="residences--building-container">
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
