import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <img src="img/stimpack_logo_with_text.png" width="450px" />                 
                <p> Kickstart your laravel project </p>                
            </div>
        );
    }
}