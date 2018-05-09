import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class ReplaceInFile extends BaseManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "ReplaceInFile",
            relativePathToFile: "",
            oldString: "",
            newString: "",
            allowEmptyStringFor: [
                "newString"
            ]                                    
        }
    }    

    renderSettings() {        
        return (
            <div className="container">
                <h4>Replace in file</h4>                
                <div className="form-group code-text-area">
                    <textarea name="relativePathToFile" placeholder="relative/root/file.php" onChange={this.setDataParameter.bind(this)} value={this.state.data.relativePathToFile} type="text" className="form-control" />
                </div>
                <div className="form-group code-text-area">
                    <textarea name="oldString" placeholder="old-string" onChange={this.setDataParameter.bind(this)} value={this.state.data.oldString} type="text" className="form-control" />                    
                </div>
                <div className="form-group code-text-area">
                    <textarea name="newString" placeholder="new-string" onChange={this.setDataParameter.bind(this)} value={this.state.data.newString} type="text" className="form-control" />
                </div>
                
            </div>
        );
    }  
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(ReplaceInFile);