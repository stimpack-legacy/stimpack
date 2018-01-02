import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Inputs from './Inputs';

export default class Generator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Inputs />
                <button className="btn btn-success btn-cool">Stim!</button>
            </div>
        );
    }
}

/*
    performTasks(tasks) {
        var index = 0;
        this.perform(tasks[index], function (index) {
            this.perform(tasks[0]
        });    
    }

    performTask(task, callback) {
        $.ajax({
            url: "/stimpack/perform/" + task,
            data: stimRequest, 
            success: function(result){
                console.log(result);
                callback();                    
            }
        });        
    }
*/