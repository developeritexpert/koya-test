import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { closeEnlarged, selectEnlarged } from './';
import ViewDragger from '../dragger/ViewDragger';
import './stylesEnlarged.scss';
import ConnectViewResidencesDayNight from '../../shared/enlarged/ConnectViewDayNight';


function ViewEnlarged ( { enlarged, closeEnlarged } ) {
  const { data} = enlarged;
  return (
      <CSSTransition className='enlarged' in={enlarged.isActive}  timeout={ 300 } classNames='fade' unmountOnExit>
          <div>
              { enlarged.isActive  
              ?
              <>
               <ViewDragger data={ data }  />
                {data.showDayNightButtons && <ConnectViewResidencesDayNight /> }
              </> 
              : <div></div>
              }
              <button className='enlarged--close-btn' onClick={ closeEnlarged } />
          </div>
      </CSSTransition> 
  );

}

 {/* passIndex={enlarged.dayEnlarged === 'Day' ? 0 : 1} hideButtons={enlarged.data.srcList.length > 1} */}
              {/* { enlarged.data.srcList.length > 1 && <ConnectViewResidencesDayNight /> } */}


const mapStateToProps = (state) => ({
  enlarged: state.enlarged
})

const mapDispatchToProps = (dispatch) => ({
  closeEnlarged: () => dispatch(closeEnlarged()),
  selectEnlarged: (data) => dispatch(selectEnlarged(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(ViewEnlarged)