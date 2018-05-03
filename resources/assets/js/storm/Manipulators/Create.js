import * as React from "react";
import {connect} from 'react-redux';
import BaseStarterManipulator from "../BaseStarterManipulator";

class Create extends BaseStarterManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "Create",
            path: "",
            isStarter: true                                    
        }
    }

    renderSettings() {
        return (
            <div className="container">
                <h4>Create project </h4>
                <div className="form-group">
                    <input placeholder="new-project" size="40" onChange={this.setPath.bind(this)} value={this.state.data.path} type="text" className="form-control" />
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
    BaseStarterManipulator.mapStateToProps, 
    BaseStarterManipulator.matchDispatchToProps
)(Create);