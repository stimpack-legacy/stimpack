import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setParameters} from '../../actions/index';


class Parameters extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {};        
    }

    render() {        
        return (
            <span onClick={this.openModal.bind(this)}>
                <i title="Set parameters" className="fa fa-cog icon-control-bar icon-control-bar"></i>
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
            className="manipulator-modal"
            >                
                <h4>Set global parameters</h4>
                <hr />
                <div className="form-group code-text-area">
                    <textarea rows="20" placeholder="content" value={this.props.parameters} onChange={this.setParameters.bind(this)} type="text" className="form-control" />                    
                </div>
                <div className="modal-buttons">                                                
                    <button onClick={this.closeModal.bind(this)} className="btn btn-light">
                        Close
                    </button>
                </div>                                    
            </Modal>
        );
    }

    setParameters(event) {
        this.props.setParameters(event.target.value);        
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
        parameters: state.parameters 
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            setParameters: setParameters                        
        }, dispatch);
}

export default connect(
    mapStateToProps, 
    matchDispatchToProps
)(Parameters);