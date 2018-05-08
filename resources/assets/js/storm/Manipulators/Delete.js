import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class Delete extends BaseManipulator {
    
    static getDefaultManipulatorParameters() {
        return {
            name: "Delete",
            relativePathToDelete: ""                                    
        }
    }    

    renderSettings() {        
        return (            
            <div className="container">
                <h4>Delete File/Folder</h4>
                <div className="form-group">
                    <input placeholder="relative/root/file.php" onChange={this.setRelativePathToDelete.bind(this)} value={this.state.data.relativePathToDelete} type="text" className="form-control" />
                </div>
            </div>
        );
    }

    setRelativePathToDelete(event) {
        var data = this.state.data;
        data.relativePathToDelete = event.target.value;
        this.setState({data});
    }
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(Delete);