import {combineReducers} from 'redux';
import engineReducer from './engineReducer';
//import manipulatorsReducer from './manipulatorsReducer';
//import fooReducer from './fooReducer';
import navigationReducer from './navigationReducer';
import reDrawReducer from './reDrawReducer';
import latestNodeReducer from './latestNodeReducer';

const allReducers = combineReducers({
    engine: engineReducer,
    navigation: navigationReducer,
    reDraw: reDrawReducer,
    latestNode: latestNodeReducer
});

export default allReducers