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

export const openLog = () => {
    return {
        type: 'OPEN_LOG',
        payload: null
    }
};

export const registerLatestNode = (id) => {
    return {
        type: 'REGISTER_LATEST_NODE',
        payload: id
    }
};

export const setQueue = (compiledManipulators) => {
    return {
        type: 'SET_QUEUE',
        payload: Object.assign({}, compiledManipulators)
    }
};

export const setBusy = (trueOrFalse) => {
    return {
        type: 'SET_BUSY',
        payload: trueOrFalse
    }
};

export const emptyLog = () => {
    return {
        type: 'EMPTY_LOG',
        payload: null
    }
};

export const pushToLog = (item) => {
    return {
        type: 'PUSH_TO_LOG',
        payload: item
    }
};

export const setPendingManipulator = (manipulator) => {
    return {
        type: 'SET_PENDING_MANIPULATOR',
        payload: manipulator
    }
};


