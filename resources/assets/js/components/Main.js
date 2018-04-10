import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ControlBar from './ControlBar';
import Workspace from './Workspace';
import Code from './Code';
import Log from './Log';
import * as SRD from "storm-react-diagrams"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setBusy} from '../actions/index';
import {pushToLog} from '../actions/index';
import {setPendingManipulator} from '../actions/index';
import {setQueue} from '../actions/index';
import Queue from "../Queue";
import * as _ from "lodash";


class Main extends Component {
    render() {              
        return (            
            <div className="app">               
                <ControlBar />
                {this.page()}                
            </div>
        );
    }

    page() {
        var pages = {
            Workspace,
            Code,
            Log            
        };
        return React.createElement(pages[this.props.navigation]);
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
        engine: state.engine,
        navigation: state.navigation,
        queue: state.queue,
        busy: state.busy
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            setBusy: setBusy,
            setQueue: setQueue,
            pushToLog: pushToLog,
            setPendingManipulator: setPendingManipulator            
        }, dispatch);
}
  
export default connect(mapStateToProps, matchDispatchToProps)(Main)