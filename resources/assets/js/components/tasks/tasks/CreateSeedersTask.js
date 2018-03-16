import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PseudoCodeTransformer from '../../../PseudoCodeTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index';
import Template from './../../../Template';
import BaseTask from '../BaseTask'
import CreateFilesTask from '../CreateFilesTask'

class CreateSeedersTask extends CreateFilesTask {
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
            name: "CreateSeedersTask",
            enabled: true,
            transformedPseudoCode: new PseudoCodeTransformer(),
            files: [],
            activeTab: null,
            shouldDisplayFilesOfType: ["MODEL"],
            fileTypeToGenerate: "seeder"
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tasks != nextProps.tasks)
            this.task().files = Template.seeders(this.props.tasks.SetObjectModelTask.transformedPseudoCode.models());
            this.renderPhpCode();
    }      
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(CreateSeedersTask);