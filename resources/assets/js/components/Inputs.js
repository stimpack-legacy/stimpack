import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {taskPool} from './tasks/taskPool'

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(data.packs);
        return (
            <div className="inputs">
                {
                    data.packs[0].tasks.map((task)=>{
                        var Task = this.get(task);
                        return (<Task key={Task.getDefaultParameters().name} />)
                    })
                }
            </div>
        );
    }

    renderOld() {
        return (
            <div className="inputs">
                {
                    taskPool.map((Task)=>{return (<Task key={Task.getDefaultParameters().name} />)})
                }
            </div>
        );
    }

    get(task) {
        return taskPool.find(t => {
            return t.getDefaultParameters().name == task.name;
        });
    }
}


//taskPool.map((Task)=>{return (<Task key={Task.getDefaultParameters().name} />)})