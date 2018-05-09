import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class CreateFile extends BaseManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "CreateFile",
            relativePathToFile: "",
            content: ""                                    
        }
    }    

    renderSettings() {        
        return (            
            <div className="container">
                <h4>Create File</h4>
                <div className="form-group">
                    <input name="relativePathToFile" placeholder="relative/root/file.php" onChange={this.setDataParameter.bind(this)} value={this.state.data.relativePathToFile} type="text" className="form-control" />
                </div>
                <div className="form-group code-text-area">
                    <textarea name="content" rows="20" placeholder="content" onChange={this.setDataParameter.bind(this)} value={this.state.data.content} type="text" className="form-control" />                    
                </div>
            </div>
        );
    }     
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(CreateFile);