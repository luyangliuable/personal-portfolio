import React, {Component, useRef} from 'react';

type Props = {
    name?: string,
    current?: string,
    [category: string]: any
}

interface AbcState {
    name: string,
    current: string
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
    }

    render(): any {
        return (
            <div className="navbar">
                <h1 className="logo" style={{marginLeft: "10px"}}>
                    {this.state.name}
                </h1>
                <div className="navbar-left">
                    <div className="navbar-item" id="home">Home</div>
                    <div className="navbar-item" id="Experience">Experience</div>
                    <div className="navbar-item" id="Projects">Projects</div>
                    <div className="navbar-item" id="Blog">Blog</div>
                </div>
            </div>
        );
    }
}

export default NavBar;
