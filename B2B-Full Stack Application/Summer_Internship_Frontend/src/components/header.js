
// for importing company logo.

import React, { Component } from 'react'
import "../App.css"
import comLogo from '../Logo/Group 20399.png'
import hrcLogo from '../Logo/logo.png'
export default class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="Company">
                    <img src={comLogo} alt="no image" />
                </div>
                <div className="Hrc">
                    <img src={hrcLogo} alt="no image" />               
                </div>
            </div>
        )
    }
}


