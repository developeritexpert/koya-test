import produce from 'immer';


// Actions
const SELECT_ITEM = 'QWR_APP/AERIAL_MAP/SELECT_ITEM';


// Reducer
export default function reducer (state = { currItem: '' }, action = {}) {
    switch (action.type) {
        case SELECT_ITEM :
            return produce(state, draftState => {
                draftState.currItem = action.currItem;
            });       
        default :
            return state;
    }
}


// Action Creators
export const selectItem = (currItem) => ( {
    type: SELECT_ITEM,
    currItem
} );
