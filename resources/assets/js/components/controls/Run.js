import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {openLog} from '../../actions/index';
import {setQueue} from '../../actions/index';
import Queue from '../../Queue';
import Compiler from "../../Compiler";
import Validator from "../../Validator";
import BaseControl from "../BaseControl";

class Run extends BaseControl {
    constructor(props) {
        super(props);
        this.title = "Run"
        this.modalFooter = this.defaultFooter
        this.icon = "fa-play"
    }

    controlBarItem() {
        return (
            <span onClick={this.run.bind(this)} className="control-bar-item">
                <i title="Run!" className={"fa " + this.icon + " icon-control-bar"}></i><span className="control-bar-item-text">{this.title}</span>
            </span>
        );
    }

    run() {
        var compiler = new Compiler(this.props.engine);
        var compiled = compiler.compile();
        var vaildation = Validator.validate(compiled);
        if(vaildation.hasErrors) {
            alert("Something is bad!");
            return;
        }
        var queue = new Queue();
        queue.register(compiled, this.props.parameters);
        this.props.setQueue(queue);
        this.props.openLog();
    }
}

export default connect(
    BaseControl.mapStateToProps,
    BaseControl.matchDispatchToProps
)(Run);
