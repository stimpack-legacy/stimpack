import SetTargetProjectTask from './tasks/SetTargetProjectTask'
import CreateDatabaseTask from './tasks/CreateDatabaseTask'
import CreateMigrationsTask from './tasks/CreateMigrationsTask'
import CreateModelsTask from './tasks/CreateModelsTask'

export const allTasks = [
    SetTargetProjectTask,
    CreateDatabaseTask,
    CreateMigrationsTask,
    CreateModelsTask
]