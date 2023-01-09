import React, {Component, useRef} from 'react';

type Props = {
    name?: string,
    current?: string,
    [category: string]: any
}

interface AbcState {}


class Hero extends Component<{}, AbcState> {

    constructor(props: Props) {
        super(props);
    }


    componentDidMount() : void {
        window.addEventListener("scroll", () => {
            console.log("scrolled");
        });
    }

    render(): any {
        return (
            <div className="hero">
                <div style={{textAlign: "left"}}>
                    <ul>
                        <h1>
                            Hi There 👋
                        </h1>
                    </ul>
                    <ul>
                        🔭 I’m currently working on a personal 3D profile website with threes.js, NLP for comments inside open source projects
                    </ul>
                    <ul>
                        🌱 I’m currently learning blockchain algorithms and looking into web3.0
                    </ul>
                    <ul>
                        👯 I’m looking to collaborate on building a start up
                    </ul>

                    <ul>
                        🤔 I’m looking for help with building decentralised systems for startups
                    </ul>
                </div>

            </div>
        );
    }
}

export default Hero;
