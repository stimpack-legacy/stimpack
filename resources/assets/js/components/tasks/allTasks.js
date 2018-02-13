import LaravelNewTask from './tasks/LaravelNewTask'
import CreateDatabaseTask from './tasks/CreateDatabaseTask'

export const allTasks = [
    LaravelNewTask.getDefaultParameters(),
    CreateDatabaseTask.getDefaultParameters()
]