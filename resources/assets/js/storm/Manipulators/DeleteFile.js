import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class DeleteFile extends BaseManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "DeleteFile",
            path: ""                                    
        }
    }    

    renderSettings() {        
        return (            
            <div className="container">
                <h4>Delete File</h4>
                <div className="form-group">
                    <input placeholder="relative/root/file.php" onChange={this.setPath.bind(this)} value={this.state.data.path} type="text" className="form-control" />
                </div>
            </div>
        );
    }

    setPath(event) {
        var data = this.state.data;
        data.path = event.target.value;
        this.setState({data});
    }
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(DeleteFile);