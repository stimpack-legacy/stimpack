import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../actions/index'
import BaseTask from './BaseTask'

class LaravelNewTask extends BaseTask {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="LaravelNewTask-switch" checked={this.props.tasks.LaravelNewTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="LaravelNewTask-switch">Set target project</label>                    
                        </span>
                    </div>
                    <div className="card-body">
                    <form>
                        <div className="form-group">
                            <p>Select an existing project, or type a new name to create a fresh project.</p>
                            <input type="text" list="projects" />
                            <datalist onChange={this.changeProjectName.bind(this)} id="projects" placeholder="my-new-project">
                                {this.renderOptions()}
                            </datalist>                            
                        </div>
                    </form>
                    </div>
                </div>                
            </div>
        );
    }

    renderOptions() {
        return projects.map(function(project) {
            return (<option key={project}>{project}</option>);
        })
        
    }

    changeProjectName(e) {
        var updatedTasks = this.props.tasks;
        updatedTasks.LaravelNewTask.projectName = e.target.value;
        this.props.updateTasks(updatedTasks);
    }     
}

function mapStateToProps(state) {
    return {
        pseudoCode: state.pseudoCode,
        tasks: state.tasks 
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            updateTasks: updateTasks
        }, dispatch);
}



// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps,matchDispatchToProps)(LaravelNewTask);


/*

*/