import Queue from "../Queue";

export default function (state = new Queue(), action) {
	
	if(action.type == "SET_QUEUE") {        
		state = Object.assign({}, action.payload);
	}

    return state;
}