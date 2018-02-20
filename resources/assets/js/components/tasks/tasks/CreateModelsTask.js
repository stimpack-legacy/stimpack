import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class CreateModelsTask extends BaseTask {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="CreateModelsTask-switch" checked={this.props.tasks.CreateModelsTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="CreateModelsTask-switch">Create Models</label>                    
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
        return this.props.tasks.CreateModelsTask.enabled && !this.props.tasks.CreateModelsTask.disabledModels.includes(modelName);
    }

    disableModel(modelName, event) {        
        if(this.props.tasks.CreateModelsTask.disabledModels.indexOf(modelName) === -1) {
            this.props.tasks.CreateModelsTask.disabledModels.push(modelName);
        } else {
            this.props.tasks.CreateModelsTask.disabledModels = this.props.tasks.CreateModelsTask.disabledModels.filter((value) => {
                return value != modelName;
            });
        }
        
        this.props.updateTasks(this.props.tasks);
    }

    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateModelsTask.enabled = !updatedTasks.CreateModelsTask.enabled; // ^= 1
        this.props.updateTasks(updatedTasks);
    }
    
    static getDefaultParameters() {
        return {
            taskName: "CreateModelsTask",
            enabled: true,
            disabledModels: ["Car"]
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

export default connect(mapStateToProps, matchDispatchToProps)(CreateModelsTask);