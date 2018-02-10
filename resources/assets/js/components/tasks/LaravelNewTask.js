import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../actions/index'

class LaravelNewTask extends Component {
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
                            <datalist id="projects" placeholder="my-new-project">
                                {this.renderOptions()}
                            </datalist>
                            {/*<label htmlFor="project-name">Project name</label>*/}
                            {/*<input type="text" onChange={this.changeProjectName.bind(this)} className="form-control" id="project-name" placeholder="my-new-project" />*/}                            
                        </div>
                    </form>
                    </div>
                </div>                
            </div>
        );
    }

    renderOptions() {
        //return (<option>{typeof projects}</option>);


        return projects.map(function(project) {
            return (<option key={project}>{project}</option>);
        })
        
    }

    changeProjectName(e) {
        var updatedTasks = this.props.tasks;
        updatedTasks.LaravelNewTask.projectName = e.target.value;
        this.props.updateTasks(updatedTasks);
    }

    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.LaravelNewTask.enabled = !updatedTasks.LaravelNewTask.enabled; // ^= 1
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