import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class Create extends BaseManipulator {
	constructor(props) {
        super("srd-default-node", props);        
		this.state = {
            isStarter: true,
            path: "/home/anders/Code/something-new",
            name: "Create"            
        };
	}

    renderSettings() {        
        return (
            <div className="container">
                <h4>Create project </h4>
                <div className="form-group">
                    <input onChange={this.setPath.bind(this)} value={this.state.path} type="text" className="form-control" />
              </div>
            </div>
        );
    }

    setPath(event) {
        var path = event.target.value;
        this.setState({path});
    }


}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(Create);