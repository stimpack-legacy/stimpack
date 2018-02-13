export const updateTransformedModels = (transformedModels) => {    
    return {
        type: 'TRANSFORMED_MODELS_UPDATED',
        payload: transformedModels
    }
};

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