import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class SetEnv extends BaseManipulator {
    static getDefaultManipulatorParameters() {
        return {
            name: "SetEnv",
            content: data.manipulatorData.SetEnv.env
        }
    }

    renderSettings() {
        return (
            <div className="form-group code-text-area">
                <textarea rows="13" name="content" placeholder="Some Code Here..." value={this.state.data.content} type="text" className="form-control" onChange={this.setDataParameter.bind(this)} />
            </div>
        )
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(SetEnv);
