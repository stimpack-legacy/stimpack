export const updatePseudoCode = (code) => {    
    return {
        type: 'PSEUDO_CODE_UPDATED',
        payload: code
    }
};

export const updateLog = (message) => {
    console.log("action");
    return {
        type: 'LOG_UPDATED',
        payload: message
    }
};