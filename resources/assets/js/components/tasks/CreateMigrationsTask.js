import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModelTransformer from '../../ModelTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePseudoCode} from '../../actions/index';
import {updateTasks} from '../../actions/index';
import Template from './../../Template';

class CreateMigrationsTask extends Component {
    componentDidMount() {
        this.setup();
        //this.test();
    }

    test() {
        var modelTransformer = new ModelTransformer();        
        modelTransformer.transform("", function(phpCode) {
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
                    <div id="pseudo-wrapper">
                        <div>
                            <ul className="editor-tabs">
                                <li className="editor-tab"><a href="#">Input</a></li>                                
                            </ul>
                        </div>
                        <div id="pseudo-editor" />
                    </div>
                    <div id="php-wrapper">
                        <div>
                            <ul className="editor-tabs">
                                {this.renderPhpTabs()}
                            </ul>
                        </div>

                        <div id="php-editor" />
                    </div>                                
                    
                    <button onClick={this.makeAuth.bind(this)} className="btn btn-default btn-cool">make:auth</button>
                    {/*
                    <div className="form-check">
                        <label className="form-check-label">
                        <input checked type="checkbox" className="form-check-input"  onChange={this.toggleAutoIdAndTimestamps} checked value="" />Auto ID and timestamps()
                        </label>
                    </div>
                    */}                    
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
        return this.props.tasks.CreateMigrationsTask.transformedModels.map((model) => {
            return (
                <li key={model.table} className="editor-tab">
                    <a onClick={this.clickTab.bind(this)} data-model={model.model} href="#">{model.model}</a>
                </li>
            );
        });
    }
    
    clickTab(e) {
        e.preventDefault();
        this.props.tasks.CreateMigrationsTask.activeTab = e.target.getAttribute("data-model");
        this.props.updateTasks(this.props.tasks);        
    }

    enableTask() {
        this.props.tasks.CreateMigrationsTask.enabled ^= 1;
        this.props.updateTasks(this.props.tasks);
    }

    updatePseudoCode(pseudoCode) {
        this.props.tasks.CreateMigrationsTask.pseudoCode = pseudoCode;
        this.props.updateTasks(this.props.tasks);        
    }

    updateTransformedModelsAndMigrations(models) {        
        this.props.tasks.CreateMigrationsTask.transformedModels = models;
        this.props.tasks.CreateMigrationsTask.migrations = Template.migrations(models);
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
        
        this.php = ace.edit("php-editor");
        this.php.$blockScrolling = Infinity;
        this.php.setTheme("ace/theme/monokai");
        this.php.getSession().setMode({
            path: "ace/mode/php",
            inline: true
        });        
        this.php.setShowPrintMargin(false);
        this.php.renderer.setShowGutter(false);        
        this.pseudo.getSession().on('change', function() {
            var pseudoCode = this.pseudo.getSession().getValue();            
            this.updatePseudoCode(pseudoCode);
            var modelTransformer = new ModelTransformer();
            modelTransformer.transform(pseudoCode, function(transformedModels) {
                this.updateTransformedModelsAndMigrations(transformedModels);                                
                this.renderPhpCode(transformedModels);                
            }.bind(this));
        }.bind(this));
    }

    renderPhpCode(transformedModels) {
        var migration = Template.migrations(transformedModels).pop();
        if(!migration) {
            this.php.setValue("", 1);
            return;
        }
        this.php.setValue(migration.body, 1);
        //this.php.setValue(this.getMigrationForActiveTab(), 1);
    }

    getMigrationForActiveTab() {
        var migration = "";
        this.props.tasks.CreateMigrationsTask.transformedModels.map((model) => {
            console.log(this.props.tasks.CreateMigrationsTask.activeTab);
            if(model.model == this.props.tasks.CreateMigrationsTask.activeTab) {
                migration = Template.migration(model);                
            }
        });
        return migration;
    }
    
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        pseudoCode: state.pseudoCode,
        tasks: state.tasks        
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            updatePseudoCode: updatePseudoCode,
            updateTasks: updateTasks
        }, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(CreateMigrationsTask);






