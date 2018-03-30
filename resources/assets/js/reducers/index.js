import {combineReducers} from 'redux';
import taskReducer from './taskReducer';
import logReducer from './logReducer';
import taskBatchReducer from './taskBatchReducer';
import engineReducer from './engineReducer';

const allReducers = combineReducers({
    tasks: taskReducer,
    log: logReducer,
    taskBatch: taskBatchReducer,
    engine: engineReducer
});

export default allReducers
