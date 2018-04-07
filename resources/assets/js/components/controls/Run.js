import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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
        var compiled = this.starters().map((starter) => {
            return this.compile(starter);                        
        });

        console.log(compiled[0].map(i => {
            return i.data;
        }));
        
        

        //this.openModal();
    }

    compile(node) {
        //console.log(node);
        var sequence = [node];
        //console.log(sequence);
        // Assume only one output port at this stage
        var out = node.getOutPorts()[0];
        //console.log(out);
        // Execution order determined by node y, then x.            
        var links = this.sortLinks(Object.values(out.links));
        //console.log(links);
        var directChildren = links.map(link => {
            return link.targetPort.parent;
        });
        //console.log(directChildren);
        
        var allChildren = directChildren.map(child => {
            return this.compile(child);
        });
        //console.log(allChildren);
        sequence = this.flatten(sequence.concat(allChildren));
        
        return sequence;       
    }

    flatten(a) {
        return a.reduce((f,i)=>f.concat(Array.isArray(i)?this.flatten(i):[i]),[]);
    }

    starters() {
        return Object.values(this.props.engine.diagramModel.nodes).filter((node) => {
            return node.isStarter();
        });
    }

    sortStarters() {
        // todo
    }

    sortLinks(links) {
        return links.sort((first, second) => {
            if(first.points[1].y < second.points[1].y) {
                return -1;
            }
        
            if(first.points[1].y > second.points[1].y) {
                return 1;
            }
        
            if(first.points[1].x < second.points[1].x) {
                return -1;
            }
        
            if(first.points[1].x > second.points[1].x) {
                return 1;
            }
        })        
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
)(Run);