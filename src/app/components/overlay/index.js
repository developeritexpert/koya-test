import produce from "immer";


// Actions
const SELECT_OVERLAY = 'DISPLAY_APP/OVERLAY/SELECT_OVERLAY';
const SELECT_OVERLAY_SLIDER = 'DISPLAY_APP/OVERLAY/SELECT_OVERLAY_SLIDER';
const CLOSE_OVERLAY = 'DISPLAY_APP/OVERLAY/CLOSE_OVERLAY';


// Reducer
export default function reducer (state = { isActive: false, hasSlider: false, data: { children: null, options: {} } }, action = {} ) {
    switch (action.type) {
        case SELECT_OVERLAY :
            return produce(state, draftState => {
                draftState.isActive = true;
                draftState.data = action.data;
            });
        case SELECT_OVERLAY_SLIDER :
            return produce(state, draftState => {
                draftState.isActive = true;
                draftState.hasSlider = true;
                draftState.data = action.data;
            });
        case CLOSE_OVERLAY :
            return produce(state, draftState => {
                draftState.isActive = false;
                draftState.hasSlider = false;
            });
        default :
            return state;
    }
}


// Action Creators
export const selectOverlay = (data) => ( {
    type: SELECT_OVERLAY,
    data
} );

export const selectOverlaySlider = (data) => ( {
    type: SELECT_OVERLAY_SLIDER,
    data
} );

export const closeOverlay = () => ( {
    type: CLOSE_OVERLAY
} );
