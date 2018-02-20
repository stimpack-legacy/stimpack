import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class CreateControllersTask extends BaseTask {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="CreateControllersTask-switch" checked={this.props.tasks.CreateControllersTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="CreateControllersTask-switch">Create Controllers</label>                    
                        </span>
                    </div>
                    <div className="card-body">                    
                        <form>
                            {this.renderModels()}
                        </form>                       
                    </div>
                </div>                
            </div>
        );
    }

    renderModels() {        
        return this.props.tasks.CreateMigrationsTask.transformedPseudoCode.models().map((model) => {
            return (
                <div key={model.model} className="form-check">
                    <label className="form-check-label">
                        <input onChange={this.disableModel.bind(this, model.model)} checked={this.shouldCheckModel(model.model)} key={model.model} type="checkbox" className="form-check-input" value="" />{model.model}
                    </label>
                </div>);
        });
    }

    shouldCheckModel(modelName) {        
        return this.props.tasks.CreateControllersTask.enabled && !this.props.tasks.CreateControllersTask.disabledModels.includes(modelName);
    }

    disableModel(modelName, event) {        
        if(this.props.tasks.CreateControllersTask.disabledModels.indexOf(modelName) === -1) {
            this.props.tasks.CreateControllersTask.disabledModels.push(modelName);
        } else {
            this.props.tasks.CreateControllersTask.disabledModels = this.props.tasks.CreateControllersTask.disabledModels.filter((value) => {
                return value != modelName;
            });
        }
        
        this.props.updateTasks(this.props.tasks);
    }

    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateControllersTask.enabled = !updatedTasks.CreateControllersTask.enabled; // ^= 1
        this.props.updateTasks(updatedTasks);
    }
    
    static getDefaultParameters() {
        return {
            taskName: "CreateControllersTask",
            enabled: true,
            disabledModels: []
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

export default connect(mapStateToProps, matchDispatchToProps)(CreateControllersTask);