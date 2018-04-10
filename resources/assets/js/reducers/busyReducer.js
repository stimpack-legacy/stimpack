export default function (state = false, action) {
	
	if(action.type == "SET_BUSY") {
		state = action.payload;
	}

    return state;
}