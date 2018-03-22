import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class PackBar extends Component {
    render() {
        return (
            <div id="packBar" className="packBar">                
                <b>Create new task</b>
                <p>Here we try to describe the pack and give hints. We will also display metadata about the pack such as creator stats, likes and latest update.</p>
                
            </div>
        );
    }
}