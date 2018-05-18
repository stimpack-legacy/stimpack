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
            <div className="form-group">
                <select name="targetProjectName" onChange={this.setDataParameter.bind(this)} value={this.state.data.targetProjectName} className="form-control" id="inputGroupSelect01">
                    {this.renderProjects()}
                </select>
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
}

export default connect(
    BaseStarterManipulator.mapStateToProps,
    BaseStarterManipulator.matchDispatchToProps
)(Load);
