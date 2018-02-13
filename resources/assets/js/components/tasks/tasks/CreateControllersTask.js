import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'

class CreateControllersTask extends Component {
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
                                {this.renderControllers()}
                            </form>                       
                    </div>
                </div>                
            </div>
        );
    }

    renderControllers() {
        return this.props.tasks.CreateMigrationsTask.transformedModels.map((model) => {
            return (
                <div key={model.model} className="form-check">
                    <label className="form-check-label">
                        <input onChange={this.disableModel} checked key={model.model} type="checkbox" className="form-check-input" value="" />{model.model}
                    </label>
                </div>);
        });
    }

    disableModel() {
        // todo
    }

    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateControllersTask.enabled = !updatedTasks.CreateControllersTask.enabled; // ^= 1
        this.props.updateTasks(updatedTasks);
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