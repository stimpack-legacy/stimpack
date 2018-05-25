var defaultParameters = 
`{
    "foo": "bar"
}`;

function getParameters() {
	if(!(typeof data.pack == "undefined")) {
		return JSON.stringify(
			JSON.parse(data.pack.content, null, 4).parameters
		);
    }
    
	return defaultParameters;
}



export default function (state = getParameters(), action) {
	
	if(action.type == "SET_PARAMETERS") {
        state = action.payload;
	}

    return state;
}