import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class ThrowBackEndError extends BaseManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "ThrowBackEndError"                                    
        }
    }    

    renderSettings() {        
        return (
            <div className="container">
                <h4>Throw a back end error!</h4>
            </div>
        );
    }
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(ThrowBackEndError);