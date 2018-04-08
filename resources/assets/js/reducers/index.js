import {combineReducers} from 'redux';
import engineReducer from './engineReducer';
//import manipulatorsReducer from './manipulatorsReducer';
//import fooReducer from './fooReducer';
import navigationReducer from './navigationReducer';
import reDrawReducer from './reDrawReducer';

const allReducers = combineReducers({
    engine: engineReducer,
    navigation: navigationReducer,
    reDraw: reDrawReducer
});

export default allReducers