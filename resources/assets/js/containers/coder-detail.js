import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class CoderDetail extends Component {
    render() {
        if (!this.props.coder) {
            return (<div>Select a coder...</div>);
        }
        return (
            <div>                
                <h2>{this.props.coder.name}</h2>
                <h3>Skill: {this.props.coder.skill}</h3>
            </div>
        );
    }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        coder: state.activeCoder
    };
}

export default connect(mapStateToProps)(CoderDetail);