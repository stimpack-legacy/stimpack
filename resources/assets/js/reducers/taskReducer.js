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
            enabled: true,
            type: "sqlite"
        },
        CreateMigrationsTask: {
            enabled: true,
            pseudoCode: "",
            transformedModels: [{
                model: "No models supplied yet",
                table: "Home",
                attributes: "No Attributes"
            }],
            migrations: []
        },
        CreateModelsTask: {
            enabled: true
        },
        CreateControllersTask: {
            enabled: true
        },
        StarOnGithubTask: {
            enabled: false
        }
    }
}
