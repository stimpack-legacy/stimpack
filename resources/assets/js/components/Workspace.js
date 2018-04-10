import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as SRD from "storm-react-diagrams"
import {connect} from 'react-redux';

class Workspace extends Component {

    render() {                
        return (            
            <SRD.DiagramWidget className="srd-demo-canvas" diagramEngine={this.props.engine} /> 
        );
    }

    componentWillReceiveProps(nextProps){
        if(this.props.reDraw != nextProps.reDraw)
            this.forceUpdate();
    }

}

function mapStateToProps(state) {
    return { 
        engine: state.engine,
        // I could not find out how/why engine reducer is not(?) updated when adding new nodes. Hence separate reDraw key.
        reDraw: state.reDraw        
    };
  }
  
export default connect(mapStateToProps)(Workspace)