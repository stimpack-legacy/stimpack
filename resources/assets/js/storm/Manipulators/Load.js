import * as React from "react";
import {connect} from 'react-redux';
import BaseStarterManipulator from "../BaseStarterManipulator";

class Load extends BaseStarterManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "Load",
            targetProjectName: "",
            isStarter: true                                    
        }
    }

    renderSettings() {        
        return (
            <div className="container">
                <h4>Create Database</h4>
                <div className="form-group">
                    <select onChange={this.setTargetProjectName.bind(this)} value={this.state.data.targetProjectName} className="form-control" id="inputGroupSelect01">                                                  
                        {this.renderProjects()}
                    </select>
              </div>
            </div>
        );
    }

    renderProjects() {
        return data.projects.map(project => {
            return (
                <option key={project} value={project}>{project}</option>
            );
        });
    }

    setTargetProjectName(event) {
        var data = this.state.data;
        data.targetProjectName = event.target.value;
        this.setState({data});                
        
        // Copy to Node Model
        this.props.node.data = this.state.data;
    }
}

export default connect(
    BaseStarterManipulator.mapStateToProps, 
    BaseStarterManipulator.matchDispatchToProps
)(Load);