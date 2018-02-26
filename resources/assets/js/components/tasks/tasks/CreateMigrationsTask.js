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
        this.setup();
    }

    body() {
        return (
            <div id="php-wrapper">
                    <ul className="editor-tabs">
                        {this.renderPhpTabs()}
                    </ul>
                <div id="migrations-editor" />
            </div>            
        );
    }

    renderPhpTabs() {
        return this.props.tasks.SetObjectModelTask.transformedPseudoCode.all().map((model) => {
            var tabClass = "editor-tab " + this.getClassForActiveTab(model.model); 
            return (
                <li key={model.table} className={tabClass}>
                    <a onClick={this.clickTab.bind(this)} data-model={model.model} href="#">{model.model}</a>
                </li>
            );
        });
    }

    getClassForActiveTab(modelName) {
        if(modelName == this.props.tasks.SetObjectModelTask.activeTab) {
            return "editor-tab-active";
        }
        return "";        
    }
    
    clickTab(e) {
        e.preventDefault();
        this.props.tasks.SetObjectModelTask.activeTab = e.target.getAttribute("data-model");
        this.props.updateTasks(this.props.tasks);        
    }

    setup() {
        this.php = ace.edit("migrations-editor");
        this.php.$blockScrolling = Infinity;
        this.php.setTheme("ace/theme/monokai");
        this.php.getSession().setMode({
            path: "ace/mode/php",
            inline: true
        });
        this.php.setValue(Template.phpPlaceholder(), 0);
        
        this.php.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false
        });        
        this.php.renderer.$cursorLayer.element.style.opacity=0;        

        this.php.setShowPrintMargin(false);
        this.php.renderer.setShowGutter(false);
    }

    renderPhpCode() {
        var activeModel = this.props.tasks.SetObjectModelTask.transformedPseudoCode.all().find((model) => {
            return model.model == this.props.tasks.SetObjectModelTask.activeTab;
        });

        var migration = Template.migration(activeModel); //Template.migration();

        if(!migration) {
            this.php.setValue("", 1);
            return;
        }
        this.php.setValue(migration.body, 1);
    }

    getMigrationForActiveTab() {
        var migration = "";
        this.props.tasks.SetObjectModelTask.transformedPseudoCode.all().map((model) => {
            console.log(this.props.tasks.SetObjectModelTask.activeTab);
            if(model.model == this.props.tasks.SetObjectModelTask.activeTab) {
                migration = Template.migration(model);                
            }
        });
        return migration;
    }

    static getDefaultParameters() {
        return {
            name: "CreateMigrationsTask",
            enabled: true,
            transformedPseudoCode: new PseudoCodeTransformer(),
            migrations: [],
            activeTab: null
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tasks != nextProps.tasks)
            this.props.tasks.CreateMigrationsTask.migrations = Template.migrations(this.props.tasks.SetObjectModelTask.transformedPseudoCode.all());
            this.renderPhpCode();
    }    
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(CreateMigrationsTask);






