import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Open from "./controls/Open";
import AddManipulator from "./controls/AddManipulator";
import Run from "./controls/Run";
import Log from "./controls/Log";
import Save from "./controls/Save";

export default class ControlBar extends Component {
    render() {        
        return (
            <div id="controlBar" className="controlBar">
                <Run />
                <AddManipulator />
                <Log />
                <Save />                                                      
                <Open />
            </div>
        );
    }    
}