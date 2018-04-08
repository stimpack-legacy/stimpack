export default function (state = "Workspace", action) {
	
	if(action.type == "NAVIGATE") {
		state = action.payload;
	}

    return state;
}