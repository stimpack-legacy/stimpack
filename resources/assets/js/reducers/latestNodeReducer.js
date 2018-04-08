export default function (state = null, action) {
	
	if(action.type == "REGISTER_LATEST_NODE") {
		state = action.payload;
	}

    return state;
}