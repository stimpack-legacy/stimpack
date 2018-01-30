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
            transformedModels2: [1,2,3],
            transformedModels3: "string",
            transformedModels4: [4],
            migrations: [],
            activeTab: null
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
