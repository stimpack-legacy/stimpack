import {combineReducers} from 'redux';
import taskReducer from './taskReducer';
import logReducer from './logReducer';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    tasks: taskReducer,
    log: logReducer
});

export default allReducers
