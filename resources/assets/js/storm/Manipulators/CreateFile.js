import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class CreateFile extends BaseManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "CreateFile",
            path: "",
            content: ""                                    
        }
    }    

    renderSettings() {        
        return (            
            <div className="container">
                <h4>Create File</h4>
                <div className="form-group">
                    <input placeholder="relative/root/file.php" onChange={this.setPath.bind(this)} value={this.state.data.path} type="text" className="form-control" />
                </div>
                <div className="form-group code-text-area">
                    <textarea rows="20" placeholder="content" onChange={this.setContent.bind(this)} value={this.state.data.content} type="text" className="form-control" />                    
                </div>
            </div>
        );
    }

    setPath(event) {
        var data = this.state.data;
        data.path = event.target.value;
        this.setState({data});
    }

    setContent(event) {
        var data = this.state.data;
        data.content = event.target.value;
        this.setState({data});        
    }        
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(CreateFile);