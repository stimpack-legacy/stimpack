import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import ControlBar from './ControlBar';
import Generator from './Generator';

export default class Main extends Component {
    render() {
        return (
            <div className="app">
                {/* <Header /> */}                
                <ControlBar />
                <Generator />                                 
                <Footer />
            </div>
        );
    }
    
    componentDidMount() {
        
        
        window.onscroll = function() {
            handleControls();
            handleFooter();
        };

        // Get the navbar
        var navbar = document.getElementById("controlBar");
        var footer = document.getElementById("footer");
        handleFooter();
        
        // Get the offset position of the navbar
        var stickyControls = navbar.offsetTop;

        // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function handleControls() {
            if (window.pageYOffset >= stickyControls+100) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }

        function handleFooter() {
            var body = document.body;
            var html = document.documentElement;
        
            var height = Math.max( body.scrollHeight, body.offsetHeight, 
                                html.clientHeight, html.scrollHeight, html.offsetHeight );            
            if (height > window.innerHeight) {
                footer.classList.add("bottom")
            } else {
                footer.classList.remove("bottom")
            }
        }        
    }
}
