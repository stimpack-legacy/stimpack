import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ControlBar from './ControlBar';
import Workspace from './Workspace';
import * as SRD from "storm-react-diagrams"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setQueue} from '../actions/index';
import Queue from "../Queue";
import * as _ from "lodash";


class Main extends Component {
    render() {              
        return (            
            <div className="app">               
                <ControlBar />
                <Workspace />                
            </div>
        );
    }

    // Process the queue - PLEASE REFACTOR THIS
    componentWillReceiveProps(nextProps){
        if(!_.isEqual(this.props.queue, nextProps.queue)) {            
            // React cant save classes - recreate it.
            var queue = Queue.deSerialize(nextProps.queue);
            // I could not get the Queue class to dispatch events, instead pass callback :/
            queue.addSetQueueCallback(function(queue) {
                this.props.setQueue(queue);
            }.bind(this));

            queue.process();
        }
    }
}

function mapStateToProps(state) {
    return { 
        queue: state.queue
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            setQueue: setQueue,
        }, dispatch);
}
  
export default connect(mapStateToProps, matchDispatchToProps)(Main)