import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class GitInit extends BaseManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "GitInit"
        }
    }

    renderSettings() {
        return (
            <div>
                <p>This is just a placeholder</p>
            </div>
        );
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(GitInit);
