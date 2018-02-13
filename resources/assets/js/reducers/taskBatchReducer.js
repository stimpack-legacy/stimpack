export default function (state = [], action) {
    switch (action.type) {
        case 'TASK_BATCH_UPDATED':
            var taskBatch = Object.assign({}, action.payload);            
            return taskBatch;
            break;
        default:
            return state;            
    }
}
