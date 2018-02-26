import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class CreateControllersTask extends BaseTask {

    body() {
        return (
            <form>
            <table className="table table-sm table-dark table-sm-width">
                <tbody>
                    {this.renderModels()}
                </tbody>
            </table>                       
        </form>
        );
    }

    renderModels() {        
        return this.props.tasks.CreateMigrationsTask.transformedPseudoCode.models().map((model) => {
            return (
                <tr key={model.model}>
                    <td>
                        <div key={model.model} className="form-check">
                            <label className="form-check-label">
                                <input onChange={this.disableModel.bind(this, model.model)} checked={this.shouldCheckModel(model.model)} key={model.model} type="checkbox" className="form-check-input" value="" />{model.model}
                            </label>
                        </div>
                    </td>
                </tr>);
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
            name: "CreateControllersTask",
            enabled: true,
            disabledModels: []
        }
    }    
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(CreateControllersTask);