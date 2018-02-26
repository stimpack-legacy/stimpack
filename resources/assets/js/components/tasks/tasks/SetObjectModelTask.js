import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PseudoCodeTransformer from '../../../PseudoCodeTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index';
import Template from './../../../Template';
import BaseTask from '../BaseTask'

class SetObjectModelTask extends BaseTask {
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
                            <input type="checkbox" className="switch" id="SetObjectModelTask-switch" checked={this.props.tasks.SetObjectModelTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="SetObjectModelTask-switch">Set project object model</label>                    
                        </span>
                    </div>
                    <div className="card-body">
                        <div>                    
                            <div id="pseudo-wrapper">
                                <ul className="editor-tabs">
                                    <li className="editor-tab input-tab"><a href="#">Input</a></li>                                
                                </ul>
                                <div id="pseudo-editor" />                       
                            </div>
                            <div id="help-wrapper">
                                <h4>Help</h4>
// Use uppercase for Model
Car
model
color
...

// Use Lower case for table only
statistics
type
value
...

// Use trailing _id for one to many
Rental
car_id
...

// use table1_table2 for many to many
car_user

// Use $* to overide best guess
Marine
$table->integer('hp')->default(1337);

// Notes
id and timestamps are added by default                       
                            </div>
                        </div>                        
                        <button onClick={this.makeAuth.bind(this)} className="btn btn-default btn-cool">make:auth</button>                  
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

    toggleAutoIdAndTimestamps() {
        console.log("Sure!");
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


    updatePseudoCode(pseudoCode) {
        this.props.tasks.SetObjectModelTask.pseudoCode = pseudoCode;
        this.props.updateTasks(this.props.tasks);        
    }

    updateTransformedPseudoCode(transformedPseudoCode, activeTab) {
        this.props.tasks.SetObjectModelTask.activeTab = activeTab;        
        this.props.tasks.SetObjectModelTask.transformedPseudoCode = transformedPseudoCode;        
        this.props.updateTasks(this.props.tasks);        
    }

    setup() {
        this.pseudo = ace.edit("pseudo-editor");
        this.pseudo.$blockScrolling = Infinity;
        this.pseudo.setTheme("ace/theme/monokai");
        this.pseudo.getSession().setMode({
            path: "ace/mode/php",
            inline: true
        });

        this.pseudo.setShowPrintMargin(false);
        this.pseudo.renderer.setShowGutter(false);
        
        this.pseudo.setValue(Template.pseudoPlaceholder(), 1);

        this.pseudo.on("focus", function() {
            if(this.pseudo.getSession().getValue() == Template.pseudoPlaceholder()) {                
                this.pseudo.setValue("", 1);
            }            
        }.bind(this));
        
        this.pseudo.on("blur", function() {
            if(this.pseudo.getSession().getValue() == "") {                
                this.pseudo.setValue(Template.pseudoPlaceholder(), 1);
            }            
        }.bind(this));

        this.pseudo.getSession().on('change', function() {            
            var pseudoCode = this.pseudo.getSession().getValue();            
            this.updatePseudoCode(pseudoCode);
            var pseudoCodeTransformer = new PseudoCodeTransformer();
            pseudoCodeTransformer.transform(pseudoCode, function(transformedPseudoCode) {
                var activeTab = pseudoCodeTransformer.activeTab(pseudoCode, this.pseudo.getCursorPosition());
                this.updateTransformedPseudoCode(transformedPseudoCode, activeTab);                                                
            }.bind(this));
        }.bind(this));
    }

    static getDefaultParameters() {
        return {
            taskName: "SetObjectModelTask",
            enabled: true,
            pseudoCode: "",
            transformedPseudoCode: new PseudoCodeTransformer(),
            migrations: [],
            activeTab: null
        }
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

export default connect(mapStateToProps, matchDispatchToProps)(SetObjectModelTask);






