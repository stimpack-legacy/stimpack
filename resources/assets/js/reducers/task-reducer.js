export default function (state = null, action) {
    switch (action.type) {
        case 'TASK_UPDATED':            
            return [ ...action.payload];
            break;
    }
    
    // Default task properties
    return [
        {
            id: "CreateDatabaseTask",
            enabled: false
        },
        {
            id: "CreateMigrationsTask",
            pseudoCode: "some code goes here",
            enabled: false
        },
        {
            id: "CreateModelsTask",
            enabled: false
        },
        {
            id: "CreateControllersTask",
            enabled: false
        },
        {
            id: "StarOnGithubTask",
            enabled: false
        },                        
    ]
}