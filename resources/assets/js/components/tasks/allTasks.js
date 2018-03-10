import SetTargetProjectTask from './tasks/SetTargetProjectTask'
import CreateDatabaseTask from './tasks/CreateDatabaseTask'
import CreateMigrationsTask from './tasks/CreateMigrationsTask'
import SetObjectModelTask from './tasks/SetObjectModelTask'
import CreateModelsTask from './tasks/CreateModelsTask'
import CreateSeedersTask from './tasks/CreateSeedersTask'
import CreateControllersTask from './tasks/CreateControllersTask'
import CreateEpicSplashPageTask from './tasks/CreateEpicSplashPageTask'
import MigrateTask from './tasks/MigrateTask'

export const allTasks = [
    SetTargetProjectTask,
    CreateDatabaseTask,
    SetObjectModelTask,
    CreateMigrationsTask,
    CreateModelsTask,
    CreateSeedersTask,    
    CreateControllersTask,
    CreateEpicSplashPageTask,
    MigrateTask
]
