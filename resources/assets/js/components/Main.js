import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ControlBar from './ControlBar';
import * as SRD from "storm-react-diagrams"
import {connect} from 'react-redux';

class Main extends Component {

    render() {        
        return (            
            <div className="app">               
                <ControlBar forceUpdateCallback={this.forceUpdateCallback.bind(this)} />
                <SRD.DiagramWidget className="srd-demo-canvas" diagramEngine={this.props.engine} />
            </div>
        );
    }

    forceUpdateCallback() {
        this.forceUpdate();
    }
}

function mapStateToProps(state) {
    return { engine: state.engine };
  }
  
export default connect(mapStateToProps)(Main)