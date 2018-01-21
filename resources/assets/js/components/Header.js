import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <span className="heading-app-name">LARAVEL   </span>
                <span><img src="img/stimpack_logo.png" width="100px" /></span>
                <span className="heading-app-name">STIMPACK</span>
            </div>
        );
    }
}


/*
<img src="img/stimpack_logo.png" width="100px" />
<h4> LARAVEL STIMPACK </h4>
*/