import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ControlBar extends Component {
    render() {
        return (
            <div id="controlBar" className="controlBar">            
                <span className="heading-app-name">LARAVEL <i className="fa fa-2x fa-syringe"></i> STIMPACK</span>                
                

                
                <form className="controlBarItem">
                    <div className="form-group controlBarItem">                        
                        <p className="controlBarItem">Target project:</p>                
                        <input defaultValue={data.projectName} type="text" list="projects" className="controlBarItem controlBarInput" />
                        <datalist id="projects" placeholder="my-new-project" className="controlBarDataList">
                            {this.renderAvailableProjects()}
                        </datalist>                            
                    </div>
                </form>
                                
                <form className="controlBarItem">
                    <div className="form-group controlBarItem">
                        <p className="controlBarItem">Using pack:</p>                        
                        <input onChange={this.selectPack} type="text" list="packs" className="controlBarItem controlBarInput" />
                        <datalist id="packs" placeholder="my-new-project" className="controlBarDataList pack-names">
                        {this.renderAvailablePacks()}
                        </datalist>                            
                    </div>                    
                </form>
                
                
                {/* <i className="fa fa-refresh fa-spin log-pending icon"></i> */}
                <i title="Run all tasks" className="fa fa-play icon-control-bar run-icon"></i>
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

/*
REALLY COOL ICONS I NEED v5 for
<i className="fa fa-2x fa-syringe icon controlBarItem"></i>
<i className="fa fa-plus icon-control-bar"></i>
<i title="Share this pack to stimpack.io" className="fab fa-5x fa-laravel"></i>

            <div className="controlBar">
                <form>
                    <div className="form-group">                        
                        <input type="text" list="projects" />
                        <datalist  id="projects" placeholder="my-new-project">
                        </datalist>                            
                    </div>
                </form>

                <form>
                    <div className="form-group">                        
                        <input type="text" list="projects2" />
                        <datalist  id="projects2" placeholder="my-new-project">
                        </datalist>                            
                    </div>
                </form>                
            </div>
*/