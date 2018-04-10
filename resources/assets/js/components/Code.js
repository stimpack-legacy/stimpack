import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Code extends Component {
    componentDidMount() {
        this.setupEditor();
    }    

    render() {
        return (
            <div id="php-wrapper">
                <div id="editor" className="result-editor" />                                
            </div>
        );
    }

    setupEditor() {
        this.editor = ace.edit("editor");
        this.editor.$blockScrolling = Infinity;
        this.editor.setTheme("ace/theme/monokai");
        this.editor.getSession().setMode({
            path: "ace/mode/json",
            inline: true
        });        


        this.editor.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false
        });
        
        this.editor.on("change", function() {
            var lineHeight = 16;
            var doc = this.editor.getSession().getDocument();
            document.getElementById("editor").style.height = lineHeight * doc.getLength() + "px";
            this.editor.resize();
        }.bind(this));

        this.editor.setValue(JSON.stringify(this.props.engine.diagramModel.serializeDiagram(), null, 4), 0);
        this.editor.setValue(this.editor.getValue(), 1);        

        this.editor.renderer.$cursorLayer.element.style.opacity=0;        

        this.editor.setShowPrintMargin(false);
        this.editor.renderer.setShowGutter(false);
    }    
}

function mapStateToProps(state) {
    return {
        engine: state.engine
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Code);
