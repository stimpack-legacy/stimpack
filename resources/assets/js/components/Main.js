import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Generator from './Generator';

export default class Main extends Component {
    render() {
        return (
            <div className="container">
                <div className="card">
                <div className="card-header">
                    Featured
                </div>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>                
            </div>
        );
    }
}


/*
                <Header />
                <Generator />
*/