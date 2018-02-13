import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../actions/index'

export default class BaseTask extends Component {
    enableTask() {
        this.props.tasks[this.constructor.name].enabled ^= 1;
        this.props.updateTasks(this.props.tasks);
    }     
}