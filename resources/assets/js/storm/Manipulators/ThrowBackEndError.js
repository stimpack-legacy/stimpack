import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class ThrowBackEndError extends BaseManipulator {
	constructor(props) {
        super("srd-default-node", props);        
        this.state = {};
        this.state = {
            data: ThrowBackEndError.getDefaultManipulatorParameters()
        }        
        this.props.node.data = this.state.data;
    }
    
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