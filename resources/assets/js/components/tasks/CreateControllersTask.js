import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTask} from '../../actions/index'

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
                <div key="{model.model}" className="form-check">
                    <label className="form-check-label">
                        <input checked key="{model.model}" type="checkbox" className="form-check-input" value="" />{model.model}
                    </label>
                </div>);
        });
    }

    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateControllersTask.enabled = !updatedTasks.CreateControllersTask.enabled; // ^= 1
        this.props.updateTask(updatedTasks);
    }    
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        pseudoCode: state.pseudoCode,
        tasks: state.tasks 
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            updateTask: updateTask
        }, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(CreateControllersTask);


/*

*/