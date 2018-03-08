import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class MigrateTask extends BaseTask {

    body() {
        return ("");
    }

    static getDefaultParameters() {
        return {
            name: "MigrateTask",
            enabled: true
        };        
    }
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(MigrateTask);