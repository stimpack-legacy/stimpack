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

    test() {
        var pseudoCodeTransformer = new PseudoCodeTransformer();        
        pseudoCodeTransformer.transform("", function(phpCode) {
            console.assert(phpCode == "", {"message": "failed empty string"});                
        }.bind(this));                        
    }

    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="CreateMigrationsTask-switch" checked={this.props.tasks.CreateMigrationsTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="CreateMigrationsTask-switch">Create Migrations</label>                    
                        </span>
                    </div>
                    <div className="card-body">                    
                        <div id="php-wrapper">
                                <ul className="editor-tabs">
                                    {this.renderPhpTabs()}
                                </ul>
                            <div id="migrations-editor" />
                        </div>
                    </div>                
                </div>                
            </div>
        );
    }

    makeAuth() {        
        this.pseudo.getSession().insert({
           row: this.pseudo.getSession().getLength(),
           column: 0
        }, "\n" + Template.makeAuthPseudoCode());
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
            taskName: "CreateMigrationsTask",
            enabled: true,
            pseudoCode: "",
            transformedPseudoCode: new PseudoCodeTransformer(),
            migrations: [],
            activeTab: null
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tasks != nextProps.tasks)
            this.renderPhpCode();
    }    
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks        
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            updateTasks: updateTasks
        }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateMigrationsTask);






