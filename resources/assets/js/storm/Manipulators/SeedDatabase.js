import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class SeedDatabase extends BaseManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "SeedDatabase"
        }
    }

    renderSettings() {
        return (
            <div>
                <p>Insert your code here</p>
            </div>
        );
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(SeedDatabase);
