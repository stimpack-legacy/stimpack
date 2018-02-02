const initialState = {
    all: [],
    waiting: [],
    running: [],
    failed: [],
    succeded: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'QUEUE_UPDATED':
            var tasks = Object.assign({}, action.payload);            
            return tasks;
            break;
        default:
            return state;            
    }   
}
