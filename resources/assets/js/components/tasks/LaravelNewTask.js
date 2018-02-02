import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTask} from '../../actions/index'

class LaravelNewTask extends Component {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="LaravelNewTask-switch" checked={this.props.tasks.LaravelNewTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="LaravelNewTask-switch">Laravel new</label>                    
                        </span>
                    </div>
                    <div className="card-body">
                    <form>
                        <div className="form-group">
                            <p>Create a brand new laravel application. All concecutive tasks will refer to this project. Tip: to keep working in the current laravel installation, leave this task unchecked.</p>
                            
                            <label htmlFor="project-name">Project name</label>                            
                            <input type="text" className="form-control" id="project-name" placeholder="my-new-project" />                            
                        </div>
                    </form>
                    </div>
                </div>                
            </div>
        );
    }
    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.LaravelNewTask.enabled = !updatedTasks.LaravelNewTask.enabled; // ^= 1
        this.props.updateTask(updatedTasks);
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
            updateTask: updateTask
        }, dispatch);
}



// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps,matchDispatchToProps)(LaravelNewTask);


/*

*/