export const updatePseudoCode = (code) => {    
    return {
        type: 'PSEUDO_CODE_UPDATED',
        payload: code
    }
};

export const updateLog = (message) => {
    return {
        type: 'LOG_UPDATED',
        payload: message
    }
};

export const updateTask = (tasks) => {
    return {
        type: 'TASK_UPDATED',
        payload: tasks
    }
};