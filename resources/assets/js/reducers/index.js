import {combineReducers} from 'redux';
import taskReducer from './taskReducer';
import logReducer from './logReducer';
import taskBatchReducer from './taskBatchReducer';

const allReducers = combineReducers({
    tasks: taskReducer,
    log: logReducer,
    taskBatch: taskBatchReducer
});

export default allReducers
