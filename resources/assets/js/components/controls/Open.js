import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BaseControl from "../BaseControl";

class Open extends BaseControl {
    constructor(props) {
        super(props)
        this.title = "Open"
        this.modalFooter = this.defaultFooter
        this.icon = "fa-folder-open"
    }

    modalBody() {
        return (
            <wrappper className="modal-body">
                <div>
                    <p> Your local packs </p>
                    <ul>
                        {this.renderLocalPacks()}
                    </ul>
                </div>
                <div className="modal-body-bottom">
                    <p> Explore all packs on <a href="https://stimpack.io">stimpack.io</a> </p>
                </div>
            </wrappper>
        )
    }

    renderLocalPacks() {
        return data.packs.map(pack => {
            return (
                <a key={pack.name} href={"/open/" + pack.name}>
                    <li>{pack.name}</li>
                </a>
            )
        })
    }
}

export default connect(
    BaseControl.mapStateToProps,
    BaseControl.matchDispatchToProps
)(Open);
