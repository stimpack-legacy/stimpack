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

export const updateDiagramEngine = (diagramEngine) => {
    return {
        type: 'UPDATE_DIAGRAM_ENGINE',
        payload: diagramEngine
    }
};

export const reDrawDiagram = (signal) => {
    return {
        type: 'RE_DRAW_DIAGRAM',
        payload: signal
    }
};

export const navigate = (page) => {
    return {
        type: 'NAVIGATE',
        payload: page
    }
};