import React, { Component, useRef } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    name?: string,
    current?: string,
    [category: string]: any
}

interface AbcState {
    name: string,
    current: string
    render?: () => React.ReactElement<any, any>,
}


class NavBar extends Component<{}, AbcState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            name: "Luyang's Portfolio",
            current: "home"
        };
    }

    componentDidMount() : void {
        document.getElementById(this.state.current).style.background="#897ed3";

        window.addEventListener("scrolled", () => {
            const scrolled = window.scrollY;
        });
    }

    componentDidUpdate() : void {
    }

    render(): React.ReactElement<any, any> {
        return (
            <div className="navbar">
                <div className="navbar-content">
                    <h1 className="logo" style={{marginLeft: "10px"}}>{this.state.name}</h1>
                    <div className="navbar-left">
                        <NavLink to="">
                            <div className="navbar-item" id="home">Home</div>
                        </NavLink>
                        <div className="navbar-item" id="Experience">Experience</div>
                        <div className="navbar-item" id="Projects">Projects</div>
                        <NavLink to="blog">
                            <div className="navbar-item" id="Blog">Blog</div>
                        </NavLink>
                    </div>
                </div>
                <div id="scroll-progress"></div>
            </div>
        );
    }
}

export default NavBar;
