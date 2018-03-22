import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import ControlBar from './ControlBar';
import PackBar from './PackBar';
import Generator from './Generator';

export default class Main extends Component {
    render() {
        return (
            <div className="app">
                {/* <Header /> */}                
                <ControlBar />
                <PackBar />                
                <Generator />                                 
                <Footer />
            </div>
        );
    }
}
