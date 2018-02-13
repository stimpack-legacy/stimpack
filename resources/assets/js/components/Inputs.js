import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {allTasks} from './tasks/allTasks'

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="inputs">
                {
                    allTasks.map((Task)=>{return (<Task key={Task.getDefaultParameters().taskName} />)})
                }
            </div>
        );
    }
}