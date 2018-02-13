export const updateLog = (message) => {
    return {
        type: 'LOG_UPDATED',
        payload: message
    }
};

export const updateTasks = (tasks) => {
    return {
        type: 'TASKS_UPDATED',
        payload: tasks
    }
};

export const updateTaskBatch = (tasks) => {
    return {
        type: 'TASK_BATCH_UPDATED',
        payload: tasks
    }
};

export const resetTaskBatch = (taskBatch) => {
    return {
        type: 'TASK_BATCH_RESET',
        payload: taskBatch
    }
};