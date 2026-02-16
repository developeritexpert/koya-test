import { combineReducers } from 'redux';
import aerialMapReducer from '../routes/map';
import residencesReducer from '../routes/residences/';
import enlargedReducer from '../shared/enlarged/';
import overlayReducer from '../app/components/overlay';


export default combineReducers( {
  aerialMap: aerialMapReducer,
  residences: residencesReducer,

  enlarged: enlargedReducer,
  overlay: overlayReducer,

} );