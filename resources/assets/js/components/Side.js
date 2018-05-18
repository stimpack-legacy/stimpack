import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ManipulatorNodeModel } from "../storm/ManipulatorNodeModel";
import AllManipulators from "../storm/AllManipulators";
import {reDrawDiagram} from '../actions/index'
import {registerLatestNode} from '../actions/index'
import { studlyCaseWithSpace } from "../Helpers";

class Side extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {};
    }

    render() {
        return (
            <div id="side" className="side">
                <div className="side-button-wrapper">
                    {this.renderStarters()}
                    {this.renderManipulators()}
                </div>
            </div>
        );
    }

    addManipulator(event) {

        let { engine } = this.props;
        let model = engine.getDiagramModel();

        var node = new ManipulatorNodeModel({
            name: event.target.value
        });

        node.addPorts();

        node.setPosition(100+Math.random()*100, 100+Math.random()*100);
        model.addNode(node);

        var latestNode = model.nodes[this.props.latestNode];
        if(latestNode) {
            node.setPosition(latestNode.x+200, latestNode.y);
            setTimeout(function() {
                if(node.isNormal() && !latestNode.isIndependent()) {
                    var fromPort = latestNode.getOutPorts()[0]; // Assume 1 port only
                    var toPort = node.getInPorts()[0]; // Assume 1 port only
                    var link = fromPort.link(toPort);
                    model.addAll(link);
                    this.props.reDrawDiagram(Date.now());
                }
            }.bind(this), 0);
        }

        this.props.registerLatestNode(node.id);
        this.props.reDrawDiagram(Date.now());
    }

    renderStarters() {
        return Object.values(AllManipulators).filter(manipulator => {
                return Boolean(manipulator.getDefaultManipulatorParameters().isStarter);
            }).map((manipulator) => {
            return (
                <div key={manipulator.getDefaultManipulatorParameters().name}>
                    <button value={manipulator.getDefaultManipulatorParameters().name} onClick={this.addManipulator.bind(this)} className="side-button starter-button">
                        {studlyCaseWithSpace(manipulator.getDefaultManipulatorParameters().name)}
                    </button>
                </div>
            )
        })
    }

    renderManipulators() {
        return Object.values(AllManipulators).filter(manipulator => {
                return (!Boolean(manipulator.getDefaultManipulatorParameters().isStarter)
                && !Boolean(manipulator.getDefaultManipulatorParameters().isIndependent));
            }).map((manipulator) => {
            return (
                <div key={manipulator.getDefaultManipulatorParameters().name}>
                    <button value={manipulator.getDefaultManipulatorParameters().name} onClick={this.addManipulator.bind(this)} className="side-button">
                        {studlyCaseWithSpace(manipulator.getDefaultManipulatorParameters().name)}
                    </button>
                </div>
            )
        })
    }
}

function mapStateToProps(state) {
    return {
        engine: state.engine,
        latestNode: state.latestNode
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            reDrawDiagram: reDrawDiagram,
            registerLatestNode: registerLatestNode
        }, dispatch);
}

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Side);
