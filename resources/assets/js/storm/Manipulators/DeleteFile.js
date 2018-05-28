import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class DeleteFile extends BaseManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "DeleteFile",
            relativePathToDelete: ""
        }
    }

    renderSettings() {
        return (
                <div className="form-group">
                    <input name="relativePathToDelete" placeholder="relative/root/file.php" onChange={this.setDataParameter.bind(this)} value={this.state.data.relativePathToDelete} type="text" className="form-control" />
                </div>
        );
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(DeleteFile);
