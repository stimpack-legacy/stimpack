export default function (state = 1, action) {
	
	if(action.type == "RE_DRAW_DIAGRAM") {
		state = action.payload;
	}

    return state;
}