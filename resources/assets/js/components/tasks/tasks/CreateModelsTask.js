import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'

class CreateModelsTask extends Component {
    render() {
        var cardBody = "";
        if(this.props.tasks.CreateModelsTask.enabled) {
            cardBody =  <div className="card-body">                    
                            <form>
                                {this.renderModels()}
                            </form>                       
                        </div>
        }

        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="CreateModelsTask-switch" checked={this.props.tasks.CreateModelsTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="CreateModelsTask-switch">Create Models</label>                    
                        </span>
                    </div>
                    {cardBody}
                </div>                
            </div>
        );
    }

    renderModels() {
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
        updatedTasks.CreateModelsTask.enabled = !updatedTasks.CreateModelsTask.enabled; // ^= 1
        this.props.updateTasks(updatedTasks);
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
            updateTasks: updateTasks
        }, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(CreateModelsTask);


/*

*/