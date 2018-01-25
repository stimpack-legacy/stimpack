export default function (state = null, action) {
    switch (action.type) {
        case 'PSEUDO_CODE_UPDATED':            
            return action.payload;
            break;
    }
    return state;
}