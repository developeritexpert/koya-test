import produce from "immer";


// Actions
const UPDATE_ROTATION = 'QWR_APP/FEATURES/UPDATE_ROTATION';
const UPDATE_IS_ANIMATING = 'QWR_APP/FEATURES/UPDATE_IS_ANIMATING';


// Reducer
export default function reducer (state = { currRotation: 0, isAnimating: false }, action = {}) {
    switch (action.type) {
        case UPDATE_ROTATION :
            return produce(state, draftState => {
                draftState.currRotation = action.currRotation;
            });   
        case UPDATE_IS_ANIMATING :
            return produce(state, draftState => {
                draftState.isAnimating = action.isAnimating;
            });        
        default :
            return state;
      }
}


// Action Creators
export const updateRotation = (currRotation) => ( {
    type: UPDATE_ROTATION,
    currRotation
} );

export const updateIsAnimating = (isAnimating) => ( {
    type: UPDATE_IS_ANIMATING,
    isAnimating
} );
