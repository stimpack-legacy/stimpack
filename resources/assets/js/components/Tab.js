import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Tab extends Component {
    render() {
        return (
            <p>{this.props.content}</p>            
        );
    }
}