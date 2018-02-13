import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class SampleTask extends Component {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="switch-id" checked onChange={this.enableTask} />
                            <label htmlFor="switch-id"></label>                    
                        </span>  
                        <span className="task-name">
                            Create Database
                        </span>
                    </div>
                    <div className="card-body">                    
                    <p>Select your prefered database</p>
                    <select className="form-control" id="inputGroupSelect01">                      
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

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(SampleTask);
