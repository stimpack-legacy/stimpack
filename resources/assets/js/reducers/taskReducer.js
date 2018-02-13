import {allTasks} from '../components/tasks/allTasks'
/*
const initialState = {
    LaravelNewTask: LaravelNewTask.getDefaultParameters(),
    CreateDatabaseTask: {
        enabled: true,
        type: "sqlite"
    },
    CreateMigrationsTask: {
        enabled: true,
        pseudoCode: "",
        transformedModels: [],
        migrations: [],
        activeTab: null
    },
    MigrateTask: {
        enabled: true
    },        
    CreateModelsTask: {
        enabled: true
    },
    CreateControllersTask: {
        enabled: true
    },
    StarOnGithubTask: {
        enabled: false
    },
    GitInitTask: {
        enabled: true
    }
};
*/

var initialState = {}
allTasks.forEach(function(element) {
    initialState[element.taskName] = element;    
});
console.log(allTasks);


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
