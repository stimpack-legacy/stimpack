import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ManipulatorNodeModel } from "../../storm/ManipulatorNodeModel";
import AllManipulators from "../../storm/AllManipulators";
import {reDrawDiagram} from '../../actions/index'
import {registerLatestNode} from '../../actions/index'
import Queue from "../../Queue";
import AutoLinkText from 'react-autolink-text2';
import BaseControl from "../BaseControl";

class Log extends BaseControl {
    constructor(props) {
        super(props);
        this.title = "Log"
        this.modalFooter = this.defaultFooter
        this.icon = "fa-align-left"
    }

    modalBody() {
        return(
            <ul className="logItems modal-body">
                {this.renderLogItems()}
                {this.renderPendingItems()}
                {this.renderFailedItems()}
                {this.renderEncouragingText()}
            </ul>
        )
    }

    renderEncouragingText() {
        if(this.renderLogItems() == "" && this.renderPendingItems() == undefined && this.renderFailedItems() == undefined) {
            return(
                "You need to get back to work to see something here..."
            )
        }
    }

    renderLogItems() {
        return this.props.queue.finished.map((item, index) => {
            return(
                <div className="log-group" key={index}>
                    <div><i className={`fa ${this.icons("succeded")}`}></i> {item.name}</div>
                    {item.result.messages.map((message, index) => {
                        return (
                            <p className="log-item-message" key={index}>
                                <AutoLinkText linkProps={{"target": "_blank"}} text={message} />
                            </p>
                        )
                    })}
                </div>
            )
        })
    }

    renderPendingItems() {
        if(this.props.queue.pending) {
            return (
                <div key="pending">
                    <li className="message-no-wrap"><i className={`fa ${this.icons("pending")}`}></i> {this.props.queue.pending.name}</li>
                </div>
            )
        }
    }

    renderFailedItems() {
        if(this.props.queue.failed) {
            return (
                <div key="failed">
                    <li><i className={`fa ${this.icons("failed")}`}></i> {this.props.queue.failed.name}</li>
                    {this.props.queue.failed.result.messages.map((message, index) => {
                        return (
                            <p className="log-item-message" key={index}>
                                <AutoLinkText text={message} />
                            </p>
                        )
                    })}
                </div>
            )
        }
    }

    icons(icon) {
        return {
            "queued": "fa-sync-alt fa-spin log-pending",
            "pending": "fa-sync-alt fa-spin log-pending",
            "succeded": "fa-check-circle log-ok",
            "failed": "fa-exclamation-circle log-error"
        }[icon];
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(this.props.queue, nextProps.queue)) {
            // React/redux cant save classes - recreate it.
            var queue = Queue.deSerialize(nextProps.queue);
            if(queue.isAboutToRun()) {
                this.setState({
                    modalIsOpen: true,
                })
            }
        }
    }
}

export default connect(
    BaseControl.mapStateToProps,
    BaseControl.matchDispatchToProps
)(Log)
