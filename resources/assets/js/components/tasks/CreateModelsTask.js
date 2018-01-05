import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CreateModelsTask extends Component {
    render() {
        return (
            <div>
                <div className="input-panel">
                    Models
                </div>                
                <p> Here we can create models </p>
            </div>
        );
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
export default connect(mapStateToProps)(CreateModelsTask);
