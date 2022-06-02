import myReducer from './myReducer';
import checkdata from './checkbox_selected';
import { combineReducers } from "redux";
const allReducers = combineReducers({
  myReducer: myReducer,
  ch: checkdata,
});
export default allReducers;