import {allTasks} from '../components/tasks/allTasks'

var initialState = {}

allTasks.forEach(function(task) {    
    initialState[task.getDefaultParameters().name] = task.getDefaultParameters();    
});


export default function (state = initialState, action) {
    switch (action.type) {
        case 'TASKS_UPDATED':
            var tasks = Object.assign({}, action.payload);            
            return tasks;
            break;
        default:
            return state;            
    }
}
