import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class AddDNS extends BaseManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "AddDNS"
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
)(AddDNS);
