export const reDrawDiagram = (signal) => {
    return {
        type: 'RE_DRAW_DIAGRAM',
        payload: signal
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