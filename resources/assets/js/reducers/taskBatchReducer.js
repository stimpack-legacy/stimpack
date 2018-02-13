const initialState = {
    tasks: [],
    busy: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'TASK_BATCH_RESET':
            var taskBatch = Object.assign({}, action.payload);
            return taskBatch;
            break;        
        case 'TASK_BATCH_UPDATED':
            var taskBatch = Object.assign({}, action.payload);
            return taskBatch;
            break;
        default:
            return state;            
    }
}
