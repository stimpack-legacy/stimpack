export default function (state = null, action) {
	
	if(action.type == "SET_PENDING_MANIPULATOR") {
		state = action.payload;
	}

    return state;
}