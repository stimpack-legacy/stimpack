import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class ScaffoldLaravel extends BaseManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "ScaffoldLaravel",
            pseudoCode: ""                                    
        }
    }    

    renderSettings() {        
        return (
            <div className="container">
                <h4>Replace in file</h4>                
                <div className="form-group code-text-area">
                    <textarea name="pseudoCode" placeholder="Some Code Here..." value={this.state.data.pseudoCode} type="text" className="form-control" onChange={this.setDataParameter.bind(this)} />
                </div>                
            </div>
        );
    }   
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(ScaffoldLaravel);