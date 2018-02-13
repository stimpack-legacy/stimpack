import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class SetTargetProjectTask extends BaseTask {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="SetTargetProjectTask-switch" checked={this.props.tasks.SetTargetProjectTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="SetTargetProjectTask-switch">Set target project</label>                    
                        </span>
                    </div>
                    <div className="card-body">
                    <form>
                        <div className="form-group">
                            <p>Select an existing project, or type a new name to create a fresh project.</p>                            
                            <input onChange={this.setProjectName.bind(this)} type="text" list="projects" />
                            <datalist  id="projects" placeholder="my-new-project">
                                {this.renderAvailableProjects()}
                            </datalist>                            
                        </div>
                    </form>
                    </div>
                </div>                
            </div>
        );
    }

    renderAvailableProjects() {
        return projects.map(function(project) {
            return (<option key={project}>{project}</option>);
        })
        
    }

    setProjectName(e) {        
        var updatedTasks = this.props.tasks;
        updatedTasks.SetTargetProjectTask.projectName = e.target.value;
        this.props.updateTasks(updatedTasks);        
    }

    static getDefaultParameters() {
        return {
            mandatory: true,
            taskName: "SetTargetProjectTask",
            enabled: true,
            projectPath: "/../",
            projectName: "my-new-project"
        };        
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

export default connect(mapStateToProps,matchDispatchToProps)(SetTargetProjectTask);