import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class Load extends BaseManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "Load",
            path: "",
            isStarter: true                                    
        }
    }

    renderSettings() {        
        return (
            <div className="container">
                <h4>Create Database</h4>
                <div className="form-group">
                    <select onChange={this.setPath.bind(this)} value={this.state.data.path} className="form-control" id="inputGroupSelect01">                                                  
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
)(Load);