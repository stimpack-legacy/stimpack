import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class MigrateDatabase extends BaseManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "MigrateDatabase"
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
)(MigrateDatabase);
