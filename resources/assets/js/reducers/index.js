import {combineReducers} from 'redux';
import engineReducer from './engineReducer';
import manipulatorsReducer from './manipulatorsReducer';
import fooReducer from './fooReducer';

const allReducers = combineReducers({
    engine: engineReducer,
    manipulators: manipulatorsReducer,
    foo: fooReducer
});

export default allReducers