import produce from "immer";


// Actions
const SELECT_ENLARGED = 'QWR_APP/ENLARGED/SELECT_ENLARGED';
const CLOSE_ENLARGED = 'QWR_APP/ENLARGED/CLOSE_ENLARGED';
const TOGGLE_NIGHT = 'QWR_APP/ENLARGED/TOGGLE_NIGHT';
const TOGGLE_DAY = 'QWR_APP/ENLARGED/TOGGLE_DAY';
// Reducer
export default function reducer (state = { isActive: false,    data: {  srcList: [], currSrcIndex: 0, showDayNightButtons: false, dayEnlarged: 'Night', } }, action = {}) {
    switch (action.type) {
        case SELECT_ENLARGED :
            return produce(state, draftState => {
                draftState.isActive = true;
                draftState.data = action.data;
            });  
        case CLOSE_ENLARGED :
            return produce(state, draftState => {
                draftState.isActive = false;
            });  
        case TOGGLE_DAY:
            
            return produce(state, draftState => {
                draftState.data.dayEnlarged = 'Day';
                draftState.data.currSrcIndex = 1;
            });
        case TOGGLE_NIGHT:
            
            return produce(state, draftState => {
                draftState.data.dayEnlarged = 'Night';
                draftState.data.currSrcIndex = 0;

            });    

        default :
            return state;
    }
}


// Action Creators
export const selectEnlarged = (data,) => ( {
    type: SELECT_ENLARGED,
    data
} );

export const closeEnlarged = () => ( {
    type: CLOSE_ENLARGED
} );

export const toggleDay = () => ( {
    type: TOGGLE_DAY,
} );

export const toggleNight = () => ( {
    type: TOGGLE_NIGHT,
} );


