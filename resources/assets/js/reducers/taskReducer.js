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
            enabled: false,
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
