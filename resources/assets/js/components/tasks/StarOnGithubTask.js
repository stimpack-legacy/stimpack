import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTask} from '../../actions/index'

class StarOnGithubTask extends Component {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="StarOnGithubTask-switch" checked={this.props.tasks.StarOnGithubTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="StarOnGithubTask-switch">Star your dependencies on github</label>                    
                        </span>
                    </div>
                </div>                
            </div>
        );
    }
    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.StarOnGithubTask.enabled = !updatedTasks.StarOnGithubTask.enabled; // ^= 1
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
export default connect(mapStateToProps,matchDispatchToProps)(StarOnGithubTask);


/*

*/