import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PseudoCodeTransformer from '../../../PseudoCodeTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index';
import Template from './../../../Template';
import BaseTask from '../BaseTask'

class SetObjectModel extends BaseTask {
    componentDidMount() {
        this.setup();
    }


    body() {
        return (
            <div>                    
                <div id="pseudo-wrapper">
                    <ul className="editor-tabs">
                        <li className="editor-tab input-tab"><a href="#">Input</a></li>                                
                    </ul>
                    <div id="pseudo-editor" />                       
                </div>
                <div id="help-wrapper">
                    <ul className="editor-tabs" />
                    <div id="help-content">
                        <h6>Use newline separated Models with Initial Caps</h6>
                        <p>Car</p>
                        <p>attribute1</p>
                        <p>attribute2</p>
                        <br/>
                        <p>Garage</p>
                        <p>attribute1</p>
                        <p>attribute2</p>
                        <br />
                        <h6>Use lowercase for table only</h6>
                        <p>statistics</p>
                        <p>attribute1</p>
                        <p>attribute2</p>
                        <br />
                        <h6>Use trailing _id for one to many</h6>
                        <p>Car</p>
                        <p>garage_id</p>
                        <br />
                        <h6>Use table1_table2 for many to many</h6>
                        <p>car_user</p>
                        <p>attribute1</p>
                        <p>attribute2</p>
                        <br />
                        <h6>Use $* to overide best guess</h6>
                        <p>Marine</p>
                        <p>$table->integer('hitpoints')->default(1337);</p>                                    
                        <br />

                                                            
                    </div>                                        
                </div>
                <div id="tools">
                    <button onClick={this.makeAuth.bind(this)} className="btn btn-default btn-cool">make:auth</button>
                    <button onClick={this.addSampleProject.bind(this)} className="btn btn-default btn-cool">sample project</button>                  
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

    addSampleProject() {
        this.pseudo.setValue(Template.sampleProject(), 0);       
        var row = this.pseudo.session.getLength() - 1
        var column = this.pseudo.session.getLine(row).length // or simply Infinity
        this.pseudo.selection.moveTo(row, column);
    }

    toggleAutoIdAndTimestamps() {
        console.log("Sure!");
    }

    renderPhpTabs() {        
        
        return this.props.tasks.SetObjectModel.transformedPseudoCode.all().map((model) => {
            var tabClass = "editor-tab " + this.getClassForActiveTab(model.model); 
            return (
                <li key={model.table} className={tabClass}>
                    <a onClick={this.clickTab.bind(this)} data-model={model.model} href="#">{model.model}</a>
                </li>
            );
        });
    }

    getClassForActiveTab(modelName) {
        if(modelName == this.props.tasks.SetObjectModel.activeTab) {
            return "editor-tab-active";
        }
        return "";        
    }
    
    clickTab(e) {
        e.preventDefault();
        this.props.tasks.SetObjectModel.activeTab = e.target.getAttribute("data-model");
        this.props.updateTasks(this.props.tasks);        
    }


    updatePseudoCode(pseudoCode) {
        this.props.tasks.SetObjectModel.pseudoCode = pseudoCode;
        this.props.updateTasks(this.props.tasks);        
    }

    updateTransformedPseudoCode(transformedPseudoCode, activeTab) {
        this.props.tasks.SetObjectModel.activeTab = activeTab;        
        this.props.tasks.SetObjectModel.transformedPseudoCode = transformedPseudoCode;        
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
            name: "SetObjectModel",
            enabled: true,
            pseudoCode: "",
            transformedPseudoCode: new PseudoCodeTransformer(),
            migrations: [],
            activeTab: null
        }
    }
    
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(SetObjectModel);






