import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/php';
import 'brace/theme/monokai';

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
            <div>
                <div className="form-group">
                    <input name="relativePathToFile" placeholder="relative/root/file.php" onChange={this.setDataParameter.bind(this)} value={this.state.data.relativePathToFile} type="text" className="form-control" />
                </div>
                <AceEditor
                    mode="php"
                    theme="monokai"
                    showGutter={false}
                    height='350px'
                    width='100%'                    
                    showPrintMargin={false}
                    highlightActiveLine={false}
                    onChange={this.changeContent.bind(this)}
                    value={this.state.data.content}
                    name="createxxx"
                    editorProps={
                        {$blockScrolling: true}
                    }
                />
            </div>
        );
    }
    
    changeContent(newValue) {
        var data = this.state.data;
        data.content = newValue;        
        this.setState({data});
        this.props.node.data = this.state.data;
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(CreateFile);
