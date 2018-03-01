import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PseudoCodeTransformer from '../../../PseudoCodeTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index';
import Template from './../../../Template';
import BaseTask from '../BaseTask'

class CreateMigrationsTask extends BaseTask {
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
            name: "CreateMigrationsTask",
            enabled: true,
            transformedPseudoCode: new PseudoCodeTransformer(),
            migrations: [],
            activeTab: null,
            shouldDisplayFilesOfType: "migration"
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tasks != nextProps.tasks)
            this.props.tasks.CreateMigrationsTask.migrations = Template.migrations(this.props.tasks.SetObjectModelTask.transformedPseudoCode.all());
            this.renderPhpCode();
    }    
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(CreateMigrationsTask);






