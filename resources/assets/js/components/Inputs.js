import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Database from './Database';
import CreateMigrationsTask from './tasks/tasks/CreateMigrationsTask';
import MigrateTask from './tasks/tasks/MigrateTask';
import GitInitTask from './tasks/tasks/GitInitTask';
import CreateModelsTask from './tasks/tasks/CreateModelsTask';
import CreateDatabaseTask from './tasks/tasks/CreateDatabaseTask';
import SampleTask from './tasks/tasks/SampleTask';
import StarOnGithubTask from './tasks/tasks/StarOnGithubTask';
import CreateControllersTask from './tasks/tasks/CreateControllersTask';
import LaravelNewTask from './tasks/tasks/LaravelNewTask';

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="inputs">
                <LaravelNewTask />
                <CreateDatabaseTask />
                {/*
                <CreateMigrationsTask />                                
                <CreateModelsTask />
                <CreateControllersTask />
                <StarOnGithubTask />
                <MigrateTask />
                <GitInitTask />
                */}
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
