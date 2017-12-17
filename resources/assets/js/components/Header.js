import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1>Laravel Stimpack</h1>
                <p> Kickstart your laravel project </p>                
            </div>
        );
    }
}