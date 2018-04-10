export default function (state = ["Running", "All", "The time!"], action) {
	
	if(action.type == "EMPTY_LOG") {
		state = [];
	}

	if(action.type == "PUSH_TO_LOG") {
		state = [...state, ...[action.payload]];
	}

    return state;
}