export default function (state = [], action) {
	
	if(action.type == "SET_QUEUE") {
		state = action.payload;
	}

	if(action.type == "POP_QUEUE") {
        state.pop();
        state = Object.assign([], state);
	}

    return state;
}