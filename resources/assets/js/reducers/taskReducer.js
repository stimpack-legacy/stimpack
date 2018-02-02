const initialState = {
    LaravelNewTask: {
        enabled: false,
        path: "/home/anders/Code",
        projectName: "my-second-project"
    },
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
    },
    GitInitTask: {
        enabled: true
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'TASK_UPDATED':
            var tasks = Object.assign({}, action.payload);            
            return tasks;
            break;
        default:
            return state;            
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
        },
        GitInitTask: {
            enabled: true
        }
    }
}
