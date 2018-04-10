import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Log extends Component {
    render() {
        return (
            <div>
                {this.renderLogItems()}
            </div>
        );
    }

    renderLogItems() {
        return this.props.log.map((item, index) => {
            return (
                <p key={index}>{item}</p>
            );
        });
    }
}

function mapStateToProps(state) {
    return {
        log: state.log
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Log);
