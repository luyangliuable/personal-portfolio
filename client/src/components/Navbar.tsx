import React, {Component, useRef} from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "home"
        };
    }


    componentDidMount() {
        document.getElementById(this.state.current).style.background="#EE12EF";
    }

    render() {
        return (
            <>
            <nav className="navbar">
                    <div className="navbar-item" id="home">Home</div>
                    <div className="navbar-item">Experience</div>
                    <div className="navbar-item">Projects</div>
            </nav>
            </>
        );
    }
}

export default NavBar;
