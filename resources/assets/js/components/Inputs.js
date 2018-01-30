import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Database from './Database';
import CreateMigrationsTask from './tasks/CreateMigrationsTask';
import MigrateTask from './tasks/MigrateTask';
import CreateModelsTask from './tasks/CreateModelsTask';
import CreateDatabaseTask from './tasks/CreateDatabaseTask';
import SampleTask from './tasks/SampleTask';
import StarOnGithubTask from './tasks/StarOnGithubTask';
import CreateControllersTask from './tasks/CreateControllersTask';

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="inputs">
                <CreateDatabaseTask />
                <CreateMigrationsTask />                
                <CreateModelsTask />
                <CreateControllersTask />
                <StarOnGithubTask />
                <MigrateTask />
            </div>
        );
    }
}

/*
                

<Code />
<CreateModelsTask />
<SampleTask />


<Database />
<Code />                
<Models />
<Migrations />
<Controllers />
<API Controllers />
<CRUD />

*/
