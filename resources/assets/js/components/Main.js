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
import {popQueue} from '../actions/index';
import {pushToLog} from '../actions/index';
import {emptyLog} from '../actions/index';


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

    // Process the queue
    componentWillReceiveProps(nextProps){
        if(nextProps.queue.length > 0 && !nextProps.busy) {
            var manipulator = nextProps.queue[nextProps.queue.length-1];
            this.process(manipulator);
            this.props.popQueue();            
        }
    }

    // Process queue item
    process(manipulator) {
        this.props.setBusy(true);
        console.log("processing: " + manipulator.data.name);

        $.ajax({
            type: "POST",
            url: "/stimpack/perform/" + manipulator.data.name,
            data: {
                data: this.nonCircularStringify(manipulator.data)
            },
            success: function(result){
                console.log("SUCCESS!", "--->" + result + "<---");
                this.props.pushToLog(result); 
                this.props.setBusy(false);
            }.bind(this),
            error: function(error) {
                console.log("ERROR", error.responseText);
                this.props.pushToLog(error.responseText);
                // Empty queue                
                this.props.setBusy(false);
            }.bind(this)
        });        
    }
    
    nonCircularStringify(data) {
        var cache = [];
        return JSON.stringify(data, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });
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
            popQueue: popQueue,
            pushToLog: pushToLog,
            emptyLog: emptyLog,            
        }, dispatch);
}
  
export default connect(mapStateToProps, matchDispatchToProps)(Main)