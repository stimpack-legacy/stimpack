import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class SetTargetProject extends BaseTask {

    body() {
        return (
            <form>
                <div className="form-group">
                    <p>Select an existing project, or type a new name to create a fresh project.</p>                            
                    <input onChange={this.setProjectName.bind(this)} type="text" list="projects" />
                    <datalist  id="projects" placeholder="my-new-project">
                        {this.renderAvailableProjects()}
                    </datalist>                            
                </div>
            </form>
        );
    }

    renderAvailableProjects() {
        // The data variable is injected into welcome.blade.php
        return data.projects.map(function(project) {
            return (<option key={project}>{project}</option>);
        })
        
    }

    setProjectName(e) {        
        var updatedTasks = this.props.tasks;
        updatedTasks.SetTargetProject.projectName = e.target.value;
        this.props.updateTasks(updatedTasks);        
    }

    static getDefaultParameters() {
        return {
            name: "SetTargetProject",
            enabled: true,
            projectPath: "/../",
            projectName: "my-new-project"
        };        
    }
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(SetTargetProject);