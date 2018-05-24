import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseControl from "../BaseControl";


class Parameters extends BaseControl {
    constructor(props) {
        super(props)
        this.title = "Parameters"
        this.modalFooter = this.defaultFooter
        this.icon = "fa-wrench"
    }

    modalBody() {
        return(
            <div className="form-group">
                <textarea placeholder="content" value={this.props.parameters} onChange={this.setParameters.bind(this)} type="text" className="form-control parameters-code" />
            </div>
        )
    }

    setParameters(event) {
        this.props.setParameters(event.target.value);
    }
}

export default connect(
    BaseControl.mapStateToProps,
    BaseControl.matchDispatchToProps
)(Parameters);
