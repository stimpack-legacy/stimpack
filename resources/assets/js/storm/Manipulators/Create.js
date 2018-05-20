import * as React from "react";
import {connect} from 'react-redux';
import BaseStarterManipulator from "../BaseStarterManipulator";

import NewName from '../../NewName.js'

class Create extends BaseStarterManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "Create",
            targetProjectName: "",
            isStarter: true
        }
    }

    renderSettings() {
        return (
                <div className="form-group">
                    <input name="targetProjectName" placeholder={NewName.get()} size="40" value={this.state.data.targetProjectName} onChange={this.setDataParameter.bind(this)} type="text" className="form-control" />
                </div>
        );
    }
}

export default connect(
    BaseStarterManipulator.mapStateToProps,
    BaseStarterManipulator.matchDispatchToProps
)(Create);
