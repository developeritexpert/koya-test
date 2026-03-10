import React from 'react';
// import LoadContainer from '../../components/LoadContainer';
import './stylesSplitPage.scss';

function ViewSplitPage ( { pageLeft, pageRight, className }) {

    return (
        <div className={ `split-page ${className}` }>
            <div className='split-page--page split-page--page-left'>
                { pageLeft }
            </div>
            <div className='split-page--page split-page--page-right'>
                { pageRight }
            </div>
        </div>
    );

}

export default ViewSplitPage;