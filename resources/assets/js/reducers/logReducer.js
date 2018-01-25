const initialLog = "";

export default function (state = initialLog, action) {    
    switch (action.type) {
        case 'LOG_UPDATED':            
            return state + "\n" + action.payload            
            break;
    }    
    return state;
}