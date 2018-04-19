import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class Create extends BaseManipulator {
	constructor(props) {
        super("srd-default-node", props);        
    }
    
    static getDefaultManipulatorParameters() {
        return {
            name: "Create",
            path: "/home/anders/Code/something-new",
            isStarter: true                                    
        }
    }

    renderSettings() {
        return (
            <div className="container">
                <h4>Create project </h4>
                <div className="form-group">
                    <input onChange={this.setPath.bind(this)} value={this.state.data.path} type="text" className="form-control" />
              </div>
            </div>
        );
    }

    setPath(event) {
        var data = this.state.data;
        data.path = event.target.value;
        this.setState({data});                
        
        // Copy to Node Model
        this.props.node.data = this.state.data;
    }
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(Create);