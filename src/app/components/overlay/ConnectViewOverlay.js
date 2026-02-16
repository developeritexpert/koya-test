import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { closeOverlay } from './';
import ViewSlider from '../slider/ViewSlider';
import ViewDataPage from '../datapage/ViewDataPage';
import './stylesOverlay.scss';


function ViewOverlay ( { isActive, hasSlider, data, closeOverlay } ) {
    data = { options: {}, currentIndex: 0, sliderOptions: {}, ...data };
    let children = hasSlider ? (<ViewSlider data={ data } />) : data.children;
    
    if ( data.hasOwnProperty('type') && ['vr', 'video', 'floorplan'].indexOf(data.type) > -1 )
    {
        children = <ViewDataPage type={ data.type } data={ data } />
    }
    
    const classes = 'overlay' + (data.options.shaded || true ? ' overlay__shaded' : '') + (data.options.fullScreen ? ' overlay__full-screen' : '');
    const styles = { 
        color: data.options.color || 'revert-layer', 
        textShadow: data.options.color ? 'none' : 'revert-layer',
        background: data.options.background || 'revert-layer'
    };

    return (
        <CSSTransition className={ classes } style={ styles } in={ isActive } timeout={ 300 } classNames='fade' unmountOnExit>
            <div>
                { isActive ? children : <div></div> }
                <button className='overlay--close-btn' style={ styles } onClick={ closeOverlay }></button>
                <div className='overlary--menu-cover' onClick={ closeOverlay }></div>
            </div>
        </CSSTransition>
    );
}


const mapStateToProps = (state) => ({
    isActive: state.overlay.isActive,
    hasSlider: state.overlay.hasSlider,
    data: state.overlay.data,
})

const mapDispatchToProps = (dispatch) => ({
    closeOverlay: () => dispatch(closeOverlay())
})


export default connect(mapStateToProps, mapDispatchToProps)(ViewOverlay)