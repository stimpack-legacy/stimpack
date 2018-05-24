import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class CreateDatabase extends BaseManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "CreateDatabase"
        }
    }

    renderSettings() {
        return (
            <div>
                <p>By running this manipulator we will attempt to create a database using your values specified in your .env</p>
            </div>
        );
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(CreateDatabase);
