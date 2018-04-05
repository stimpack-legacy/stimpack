import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class Load extends BaseManipulator {
	constructor(props) {
        super("srd-default-node", props);        
		this.state = {};
	}

    renderSettings() {        
        return (
            <div className="container">
                <h4>Load an existing project </h4>
                <div className="form-group">
                    <select value={this.state.project} onChange={this.handleChange.bind(this)} data-width="100%" className="form-control manipulator-project-select">
                        {this.renderAvailableProjects()}
                    </select>
              </div>
            </div>
        );
    }
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(Load);