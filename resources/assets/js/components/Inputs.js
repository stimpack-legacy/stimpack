import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Code from './Code';
import Database from './Database';
import CreateModelsTask from './tasks/CreateModelsTask';

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Code />
                <CreateModelsTask />
            </div>
        );
    }
}

/*

<Database />
<Code />                
<Models />
<Migrations />
<Controllers />
<API Controllers />
<CRUD />

*/
