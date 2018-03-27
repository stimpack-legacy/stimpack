import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class Create extends BaseTask {

    body() {
        return ("");
    }

    static getDefaultParameters() {
        return {
            name: "Create",
            enabled: true
        };        
    }
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(Create);