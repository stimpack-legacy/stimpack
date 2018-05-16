import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Open extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {};
    }

    render() {
        return (
            <span onClick={this.openModal.bind(this)} className="header-menu-item">
                <i title="Explore packs on stimpack.io" className="fas fa-folder-open icon-control-bar"></i><span className="header-menu-item-text">Open</span>
                {this.renderModal()}
            </span>




        );
    }

    renderModal() {
        return (
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal.bind(this)}
            onRequestClose={this.closeModal.bind(this)}
            contentLabel="Example Modal"
            overlayClassName="no-overlay"
            className="settings-modal medium"
            >
                <h4>Open pack</h4>
                <div className="form-group">
                    <p> Your local packs </p>
                    <ul>
                        {this.renderLocalPacks()}
                    </ul>
                    <p> Explore all packs on <a href="https://stimpack.io">stimpack.io</a> </p>
                </div>
                <div className="container settings-modal-buttons">
                    <button className="btn btn-stimpack" onClick={this.closeModal.bind(this)}>Close</button>
                </div>
            </Modal>
        );
    }

    renderLocalPacks() {
        return data.packs.map(pack => {
            return (
                <a key={pack.name} href={"/open/" + pack.name}>
                    <li>{pack.name}</li>
                </a>
            );
        });
    }

    openModal() {
        this.setState({
            modalIsOpen: true,
        });
    }

    afterOpenModal() {
        //
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
}

function mapStateToProps(state) {
    return {
        engine: state.engine,
        foo: state.foo
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            //
        }, dispatch);
}

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Open);
