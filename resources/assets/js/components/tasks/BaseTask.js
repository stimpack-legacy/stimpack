import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../actions/index'
import Template from './../../Template';

export default class BaseTask extends Component {
    enableTask() {
        this.task().enabled ^= 1;
        this.props.updateTasks(this.props.tasks);
    }

    render() {
        return this.renderTask()
    }    
    
    renderTask() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id={this.switch()} checked={this.task().enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor={this.switch()}>{this.task().name}</label>                    
                        </span>
                    </div>
                    <div className="card-body">                    
                        {this.body()}
                    </div>                
                </div>                
            </div>
        );        
    }

    task() {
        return this.props.tasks[this.constructor.name];
    }

    switch() {
        return this.task().name + '-switch';
    }

    setupEditor() {
        this.php = ace.edit(this.editorName());
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

    editorName() {
        return this.task().name + '-editor';
    }
    
    renderPhpTabs() {
        return this.props.tasks.SetObjectModelTask.transformedPseudoCode.all().map((block) => {
            var tabClass = "editor-tab " + this.getClassForActiveTab(block.name); 
            return (
                <li key={block.table} className={tabClass}>
                    <a onClick={this.clickTab.bind(this)} data-model={block.name} href="#">{block.name}</a>
                </li>
            );
        });
    }

    getClassForActiveTab(blockName) {
        if(blockName == this.props.tasks.SetObjectModelTask.activeTab) {
            return "editor-tab-active";
        }
        return "";        
    }
    
    clickTab(e) {
        e.preventDefault();
        this.props.tasks.SetObjectModelTask.activeTab = e.target.getAttribute("data-model");
        this.props.updateTasks(this.props.tasks);        
    }

    renderPhpCode() {
        var activeModel = this.props.tasks.SetObjectModelTask.transformedPseudoCode.all().find((model) => {
            return model.name == this.props.tasks.SetObjectModelTask.activeTab;
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

    static mapStateToProps(state) {
        return {
            tasks: state.tasks 
        };
    }
    
    static matchDispatchToProps(dispatch){
        return bindActionCreators(
            {
                updateTasks: updateTasks
            }, dispatch);
    }    
}