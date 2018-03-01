import SetTargetProjectTask from './tasks/SetTargetProjectTask'
import CreateDatabaseTask from './tasks/CreateDatabaseTask'
import CreateMigrationsTask from './tasks/CreateMigrationsTask'
import SetObjectModelTask from './tasks/SetObjectModelTask'
import CreateModelsTask from './tasks/CreateModelsTask'
import CreateControllersTask from './tasks/CreateControllersTask'
import CreateEpicSplashPageTask from './tasks/CreateEpicSplashPageTask'

export const allTasks = [
    SetTargetProjectTask,
    CreateDatabaseTask,
    SetObjectModelTask,
    CreateMigrationsTask,
    CreateModelsTask,
    CreateControllersTask,
    CreateEpicSplashPageTask
]
