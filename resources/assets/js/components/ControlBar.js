import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ControlBar extends Component {
    render() {
        return (
            <div id="controlBar" className="controlBar">            
                <span className="heading-app-name">LARAVEL <i className="fa fa-2x fa-syringe"></i> STIMPACK</span>                
                

                
                
                {/* <i className="fa fa-refresh fa-spin log-pending icon"></i> */}
                <i title="Run all tasks" className="fa fa-play icon-control-bar icon-control-bar"></i>
                <i title="Add task" className="fa fa-plus icon-control-bar"></i>
                <i title="Remove all tasks" className="far fa-trash-alt icon-control-bar"></i>

                <i title="Save this pack" className="far fa-save icon-control-bar"></i>
                <i title="Share this pack to stimpack.io" className="fa fa-upload icon-control-bar"></i>
                <i title="Explore packs on stimpack.io" className="fas fa-search icon-control-bar"></i>
                
                

                
                                
            </div>
        );
    }

    renderAvailableProjects() {
        // The data variable is injected into welcome.blade.php
        return data.projects.map(function(project) {
            return (<option key={project}>{project}</option>);
        })        
    }
    
    renderAvailablePacks() {
        // The data variable is injected into welcome.blade.php
                
        return data.packs.map((pack) => {
            return (<option key={pack.name}>{pack.name}</option>);
        })        
    }
    
    selectPack() {
        document.getElementById('packBar').style.display = "block";
    }
}