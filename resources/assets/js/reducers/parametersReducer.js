var defaultParameters = 
`{
    "foo": "bar"
}`;

export default function (state = defaultParameters, action) {
	
	if(action.type == "SET_PARAMETERS") {
        state = action.payload;
	}

    return state;
}