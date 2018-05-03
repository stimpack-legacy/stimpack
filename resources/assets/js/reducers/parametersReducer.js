var defaultParameters = 
`{
    "foo": "bar"
}`;

function getParameters() {
	if(!(typeof data.pack == "undefined")) {
		return JSON.stringify(data.pack.content.parameters, null, 4);
    }
    
	return defaultParameters;
}



export default function (state = getParameters(), action) {
	
	if(action.type == "SET_PARAMETERS") {
        state = action.payload;
	}

    return state;
}