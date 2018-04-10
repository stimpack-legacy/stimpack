import {combineReducers} from 'redux';
import engineReducer from './engineReducer';
import navigationReducer from './navigationReducer';
import reDrawReducer from './reDrawReducer';
import latestNodeReducer from './latestNodeReducer';
import queueReducer from './queueReducer';
import busyReducer from './busyReducer';
import logReducer from './logReducer';


const allReducers = combineReducers({
    engine: engineReducer,
    navigation: navigationReducer,
    reDraw: reDrawReducer,
    latestNode: latestNodeReducer,
    queue: queueReducer,
    busy: busyReducer,
    log: logReducer
});

export default allReducers