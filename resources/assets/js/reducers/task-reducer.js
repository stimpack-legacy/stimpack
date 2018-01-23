export default function (state = null, action) {
    switch (action.type) {
        case 'TASK_UPDATED':
            var tasks = Object.assign({}, action.payload);            
            return tasks;
            break;
    }
    
    // Default task properties
    return {
        CreateDatabaseTask: {
            enabled: false
        },
        CreateMigrationsTask: {
            enabled: false
        },
        CreateModelsTask: {
            enabled: false
        },
        CreateControllersTask: {
            enabled: false
        },
        StarOnGithubTask: {
            enabled: false
        }
    }
}
