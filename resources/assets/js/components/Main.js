import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import ControlBar from './ControlBar';
import Generator from './Generator';

export default class Main extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <ControlBar />
                <Generator />                                 
            </div>
        );
    }
}