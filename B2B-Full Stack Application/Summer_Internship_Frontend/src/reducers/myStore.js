// import {createStore} from 'redux';

// import myReducer from './myReducer';

// const myStore = createStore(myReducer,  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_());
// export default myStore;

import {createStore} from 'redux';

import myReducer from './myReducer';
import allReducers from './index1';
const myStore = createStore(allReducers,  window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION());
export default myStore;
