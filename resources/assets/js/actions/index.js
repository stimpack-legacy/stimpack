export const updatePseudoCode = (code) => {
    console.log("You updated code. Look: " + code);
    return {
        type: 'PSEUDO_CODE_UPDATED',
        payload: code
    }
};