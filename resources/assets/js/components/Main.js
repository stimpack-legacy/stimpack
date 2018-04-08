import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ControlBar from './ControlBar';
import Workspace from './Workspace';
import Code from './Code';
import Log from './Log';
import * as SRD from "storm-react-diagrams"
import {connect} from 'react-redux';

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

}

function mapStateToProps(state) {
    return { 
        engine: state.engine,
        navigation: state.navigation
    };
  }
  
export default connect(mapStateToProps)(Main)