import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends Component {
    render() {
        return (
            <div id="footer" className="footer">                
                <i title="github" className="fa fa-2x fa-github icon-footer"></i>
                <i title="github" className="fa fa-2x fa-twitter icon-footer"></i>
                <i title="github" className="fa fa-2x fa-facebook icon-footer"></i>
                <i title="github" className="fa fa-2x fa-kickstarter icon-footer"></i>
                
            </div>
        );
    }
}