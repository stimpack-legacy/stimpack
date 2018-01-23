import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class StarOnGithubTask extends Component {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="switch-id" onChange={this.enableTask} />
                            <label htmlFor="switch-id">Star this package on github</label>                    
                        </span>
                    </div>
                    <div className="card-body">                    
                    <p>Spread the word. You can also help by reporting issues or contributing your own task. Thank you for using Laravel Stimpack.</p>                       
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
export default connect(mapStateToProps)(StarOnGithubTask);


/*

*/