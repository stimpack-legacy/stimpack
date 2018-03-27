import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PseudoCodeTransformer from '../../../PseudoCodeTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index';
import Template from './../../../Template';
import BaseTask from '../BaseTask'
import CreateFilesTask from '../CreateFilesTask'

class CreateModels extends CreateFilesTask {
    componentDidMount() {
        this.setupEditor();
    }

    body() {
        return (
            <div id="php-wrapper">
                    <ul className="editor-tabs">
                        {this.renderPhpTabs()}
                    </ul>
                <div id={this.editorName()} className="result-editor" />
            </div>            
        );
    }


    static getDefaultParameters() {
        return {
            name: "CreateModels",
            enabled: true,
            pseudoCode: "",
            transformedPseudoCode: new PseudoCodeTransformer(),
            files: [],
            activeTab: null,
            shouldDisplayFilesOfType: ["MODEL"],
            fileTypeToGenerate: "model"
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tasks != nextProps.tasks) {
            this.task().files = Template.models(this.props.tasks.SetObjectModel.transformedPseudoCode.models());
            this.renderPhpCode();
        }
        
    }      
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(CreateModels);