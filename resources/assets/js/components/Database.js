import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Database extends Component {
    componentDidMount() {
        console.log("Mounting another component")
    }

    render() {
        return (
            <div>
                <div className="input-panel">
                    Database
                </div>                
                <p> this and {this.props.pseudoCode} also </p>
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
export default connect(mapStateToProps)(Database);
