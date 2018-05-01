import * as React from "react";
import {connect} from 'react-redux';
import BaseIndependentManipulator from "../BaseIndependentManipulator";

class SetGlobalParameters extends BaseIndependentManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "SetGlobalParameters",
            globalParameters: '{ "foo": "bar" }',
            isIndependent: true                                    
        }
    }    

    renderSettings() {        
        return (            
            <div className="container">
                <h4>Set global parameters</h4>
                <div className="form-group code-text-area">
                    <textarea rows="20" placeholder="content" onChange={this.setContent.bind(this)} value={this.state.data.globalParameters} type="text" className="form-control" />                    
                </div>
            </div>
        );
    }

    setContent(event) {
        var data = this.state.data;
        data.globalParameters = event.target.value;
        this.setState({data});        
    }        
}

export default connect(
    BaseIndependentManipulator.mapStateToProps, 
    BaseIndependentManipulator.matchDispatchToProps
)(SetGlobalParameters);