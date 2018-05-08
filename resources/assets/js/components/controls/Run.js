import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {openLog} from '../../actions/index';
import {setQueue} from '../../actions/index';
import Queue from '../../Queue';
import Compiler from "../../Compiler"
import Validator from "../../Validator"

class Run extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {};        
    }

    render() {        
        return (
            <span onClick={this.run.bind(this)}>
                <i title="Run!" className="fa fa-play icon-control-bar icon-control-bar"></i>
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
                <h4>Run!</h4>                
                <div className="container settings-modal-buttons">                    
                    <button className="btn btn-stimpack" onClick={this.closeModal.bind(this)}>Close</button>
                </div>                    
            </Modal>
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
        foo: state.foo,        
        parameters: state.parameters 
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            openLog: openLog,
            setQueue: setQueue                        
        }, dispatch);
}

export default connect(
    mapStateToProps, 
    matchDispatchToProps
)(Run);