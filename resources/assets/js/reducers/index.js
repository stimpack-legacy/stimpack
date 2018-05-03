import {combineReducers} from 'redux';
import engineReducer from './engineReducer';
import reDrawReducer from './reDrawReducer';
import latestNodeReducer from './latestNodeReducer';
import queueReducer from './queueReducer';
import parametersReducer from './parametersReducer';


const allReducers = combineReducers({
    engine: engineReducer,
    reDraw: reDrawReducer,
    latestNode: latestNodeReducer,
    queue: queueReducer,
    parameters: parametersReducer
});

export default allReducers