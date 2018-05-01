import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class ReplaceInFile extends BaseManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "ReplaceInFile",
            path: "",
            oldString: "",
            newString: ""                                    
        }
    }    

    renderSettings() {        
        return (
            <div className="container">
                <h4>Replace in file</h4>                
                <div className="form-group code-text-area">
                    <textarea placeholder="relative/root/file.php" onChange={this.setPath.bind(this)} value={this.state.data.path} type="text" className="form-control" />
                </div>
                <div className="form-group code-text-area">
                    <textarea placeholder="old-string" onChange={this.setOldString.bind(this)} value={this.state.data.oldString} type="text" className="form-control" />                    
                </div>
                <div className="form-group code-text-area">
                    <textarea placeholder="new-string" onChange={this.setNewString.bind(this)} value={this.state.data.newString} type="text" className="form-control" />
                </div>
                
            </div>
        );
    }

    setPath(event) {
        var data = this.state.data;
        data.path = event.target.value;
        this.setState({data});
    }

    setOldString(event) {
        var data = this.state.data;
        data.oldString = event.target.value;
        this.setState({data});
    }

    setNewString(event) {
        var data = this.state.data;
        data.newString = event.target.value;
        this.setState({data});        
    }        
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(ReplaceInFile);