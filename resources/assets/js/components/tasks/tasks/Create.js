import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#main')

class Create extends BaseTask {
    constructor() {
        super();
    
        this.state = {
          modalIsOpen: false
        };
    
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }    

    body() {
        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
        
                <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                <button onClick={this.closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
                </Modal>
            </div>
        );
    }

    static getDefaultParameters() {
        return {
            name: "Create",
            enabled: true
        };        
    }
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(Create);