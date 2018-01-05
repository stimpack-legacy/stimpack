import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Generator from './Generator';

export default class Main extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Generator />                
            </div>
        );
    }
}