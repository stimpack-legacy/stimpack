import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class Create extends BaseManipulator {
	constructor(props) {
        super("srd-default-node", props);        
		this.state = {
            isStarter: true
        };
	}

    renderSettings() {        
        return (
            <div className="container">
                <h4>Create project </h4>
                <div className="form-group">
                    <input type="text" className="form-control" />
              </div>
            </div>
        );
    }
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(Create);