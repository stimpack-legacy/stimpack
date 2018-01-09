const initialLog = "LOG ###########################################";

export default function (state = initialLog, action) {
    console.log("reducing");
    switch (action.type) {
        case 'LOG_UPDATED':            
            return state + "\n" + action.payload            
            break;
    }    
    return state;
}