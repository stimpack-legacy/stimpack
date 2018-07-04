import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class CreateSiteOnForge extends BaseManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "CreateSiteOnForge"
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
)(CreateSiteOnForge);
