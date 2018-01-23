import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CreateControllersTask extends Component {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="switch-id" checked onChange={this.enableTask} />
                            <label htmlFor="switch-id">Create Controllers</label>                    
                        </span>
                    </div>
                    <div className="card-body">                    
                    <p>Populate from project object model</p>                       
                    </div>
                </div>                
            </div>
        );
    }
    enableTask() {
        // do something
    }    
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        pseudoCode: state.pseudoCode
    };
}



// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps)(CreateControllersTask);


/*

*/