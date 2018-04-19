import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Header extends Component {
    render() {        
        return (
            <div id="header" className="header">            
                <span className="heading-app-name"><i className="fa fa-2x fa-syringe logo"></i>STIMPACK</span>                
            </div>
        );
    }    
}