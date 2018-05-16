import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ControlBar from "./ControlBar"

export default class Header extends Component {
    render() {
        return (
            <div id="header" className="header">
                <div className="logo">
                    <span className="logo-text">Stimpack</span>
                </div>
                <div className="menu">
                    <div className="menu-top">
                    </div>
                    <div className="menu-bottom">
                        <ControlBar />
                    </div>
                </div>
            </div>
        );
    }
}
