import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Open from "./controls/Open";
import Run from "./controls/Run";
import Parameters from "./controls/Parameters";
import Log from "./controls/Log";
import Save from "./controls/Save";


export default class ControlBar extends Component {
    render() {
        return (
            <span id="controlBar" className="control-bar">
                <Run />
                <Parameters />
                <Log />
                <Open />
                <Save />
            </span>
        );
    }
}
