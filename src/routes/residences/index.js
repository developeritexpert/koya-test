import produce from 'immer';

// Action Types
const UPDATE_ROTATION = 'QWR_APP/RESIDENCES/UPDATE_ROTATION';
const UPDATE_IS_ANIMATING = 'QWR_APP/RESIDENCES/UPDATE_IS_ANIMATING';
const SELECT_AREA = 'QWR_APP/RESIDENCES/SELECT_AREA';
const DESELECT_AREA = 'QWR_APP/RESIDENCES/DESELECT_AREA';
const SELECT_LEVEL_GROUP = 'QWR_APP/RESIDENCES/SELECT_LEVEL_GROUP';
const CLOSE_LEVEL_GROUP = 'QWR_APP/RESIDENCES/CLOSE_LEVEL_GROUP';
const SELECT_APARTMENT = 'QWR_APP/RESIDENCES/SELECT_APARTMENT';
const CLOSE_APARTMENT = 'QWR_APP/RESIDENCES/CLOSE_APARTMENT';
const TOGGLE_DAY_NIGHT = 'QWR_APP/RESIDENCES/TOGGLE_DAY_NIGHT';
const SET_TOWER = 'QWR_APP/RESIDENCES/SET_TOWER';
const TOGGLE_ROOM_SELECTOR = 'QWR_APP/RESIDENCES/TOGGLE_ROOM_SELECTOR';
const ADD_ROOM_SIZE = 'QWR_APP/RESIDENCES/ADD_ROOM_SIZE';
const REMOVE_ROOM_SIZE = 'QWR_APP/RESIDENCES/REMOVE_ROOM_SIZE';
const SELECT_LEVEL = 'QWR_APP/RESIDENCES/SELECT_LEVEL';
const SET_HOVERED_LEVEL = 'QWR_APP/RESIDENCES/SET_HOVERED_LEVEL';

// Initial State
const defaultState = {
  currRotation: 0,
  isAnimating: false,
  area: '',
  isAreaActive: false,
  levelGroup: '',
  isLevelGroupActive: false,
  apartment: '',
  isApartmentActive: false,
  selectedLevel: '',       // level selected from menu
  openLevel: null, // add this
  hoveredLevel: '',        // level being hovered
  roomSizes: [''],
  roomSelectorVisible: false,
  Day: 'Day',
  tower: 'T2',
};

// Reducer
export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {

    case UPDATE_ROTATION:
      return produce(state, draft => {
        draft.currRotation = action.currRotation;
      });

    case UPDATE_IS_ANIMATING:
      return produce(state, draft => {
        draft.isAnimating = action.isAnimating;
      });

    case SELECT_AREA:
      return produce(state, draft => {
        draft.isAreaActive = true;
        draft.area = action.area;
      });

    case DESELECT_AREA:
      return produce(state, draft => {
        draft.isAreaActive = false;
      });

    case SELECT_LEVEL_GROUP:
      return produce(state, draft => {
        draft.isLevelGroupActive = true;
        draft.levelGroup = action.levelGroup;
        draft.tower = action.tower;
      });

    case CLOSE_LEVEL_GROUP:
      return produce(state, draft => {
        draft.isLevelGroupActive = false;
      });

case SELECT_APARTMENT:
  return {
    ...state,
    apartment: action.payload,
    isApartmentActive: true,
  };

case CLOSE_APARTMENT:
  return {
    ...state,
    isApartmentActive: false,
    apartment: null,
  };

    case TOGGLE_DAY_NIGHT:
      return produce(state, draft => {
        draft.Day = action.Day;
      });

    case SET_TOWER:
      return produce(state, draft => {
        draft.tower = action.tower;
      });

    case ADD_ROOM_SIZE:
      const addArray = [...state.roomSizes, action.roomSize];
      if (action.roomSize === 'Clear') {
        return produce(state, draft => { draft.roomSizes = ['']; });
      }
      const filtered = addArray.length > 1 ? addArray.filter(item => item !== 'Clear') : addArray;
      return produce(state, draft => { draft.roomSizes = filtered; });

    case REMOVE_ROOM_SIZE:
      const removeArray = state.roomSizes.filter(roomSize => roomSize !== action.roomSize);
      return produce(state, draft => { draft.roomSizes = removeArray; });

    case TOGGLE_ROOM_SELECTOR:
      return produce(state, draft => {
        draft.roomSelectorVisible = action.roomSelectorVisible;
      });

    case SELECT_LEVEL:
      return produce(state, draft => {
        draft.selectedLevel = action.level;      // store selected level
        draft.levelGroup = action.level;         // also show floorplate
        draft.isLevelGroupActive = true;         // open floorplate
      });

    case SET_HOVERED_LEVEL:
      return produce(state, draft => {
        draft.hoveredLevel = action.level;       // track hovered level
      });

    default:
      return state;
  }
}

// Action Creators
export const updateRotation = (currRotation) => ({
  type: UPDATE_ROTATION,
  currRotation
});

export const updateIsAnimating = (isAnimating) => ({
  type: UPDATE_IS_ANIMATING,
  isAnimating
});

export const selectArea = (area) => ({
  type: SELECT_AREA,
  area
});

export const deselectArea = () => ({
  type: DESELECT_AREA
});

export const selectLevelGroup = ({ levelGroup, tower }) => ({
  type: SELECT_LEVEL_GROUP,
  levelGroup,
  tower
});

export const closeLevelGroup = () => ({
  type: CLOSE_LEVEL_GROUP
});

export const selectApartment = (apartmentTitle) => ({
  type: SELECT_APARTMENT,
  payload: apartmentTitle,
});


export const closeApartment = () => ({
  type: CLOSE_APARTMENT
});

export const toggleDayNight = (Day) => ({
  type: TOGGLE_DAY_NIGHT,
  Day
});

export const setTower = (tower) => ({
  type: SET_TOWER,
  tower
});

export const addRoomSize = (roomSize) => ({
  type: ADD_ROOM_SIZE,
  roomSize
});

export const removeRoomSize = (roomSize) => ({
  type: REMOVE_ROOM_SIZE,
  roomSize
});

export const toggleRoomSelector = (condition) => ({
  type: TOGGLE_ROOM_SELECTOR,
  roomSelectorVisible: condition
});

export const selectLevel = (level) => ({
  type: SELECT_LEVEL,
  level
});

export const setHoveredLevel = (level) => ({
  type: SET_HOVERED_LEVEL,
  level
});
