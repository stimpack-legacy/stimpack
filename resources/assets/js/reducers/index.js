import {combineReducers} from 'redux';
import engineReducer from './engineReducer';
import manipulatorsReducer from './manipulatorsReducer';

const allReducers = combineReducers({
    engine: engineReducer,
    manipulators: manipulatorsReducer
});

export default allReducers