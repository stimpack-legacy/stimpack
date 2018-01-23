import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CreateDatabaseTask extends Component {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="switch-id" checked onChange={this.enableTask} />
                            <label htmlFor="switch-id">Create Database</label>                    
                        </span>
                    </div>
                    <div className="card-body">                                            
                        <select className="form-control" id="inputGroupSelect01">                      
                            <option value="volvo" disabled selected>Select database type</option>
                            <option value="sqlite">Sqlite</option>
                            <option value="mysql">MySQL</option>
                            <option value="postgres">PostgreSQL</option>
                        </select>                       
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
export default connect(mapStateToProps)(CreateDatabaseTask);


/*

*/