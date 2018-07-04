import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ControlBar from "./ControlBar"

export default class Header extends Component {
    render() {
        return (
            <div id="header" className="header">
                <ControlBar />
            </div>
        );
    }
}
