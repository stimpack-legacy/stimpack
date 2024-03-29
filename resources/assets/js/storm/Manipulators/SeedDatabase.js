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
                <h3>Beware! This is just a placeholder</h3>
            </div>
        );
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(SeedDatabase);
