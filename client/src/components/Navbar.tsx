import React, { Component, useRef } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    name?: string,
    current?: string,
    /* [category: string]: any */
}

interface AbcState {
    name: string,
    links: { name: string, to: string }[],
    render?: () => React.ReactElement<any, any>,
}


class NavBar extends Component<{}, AbcState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            links: [
                { name: 'Home', to: '/' },
                { name: 'Blog', to: '/blog' },
                { name: 'Projects', to: '/project' }
            ],
            name: "Luyang's Portfolio",
        };
    }

    attachNavBar(): void {
        const element = document.querySelector('.navbar');
        element.classList.remove("detached");
    }


    detachNavBar(): void {
        const element = document.querySelector('.navbar');
        element.classList.add("detached");
    }


    get navBarHeight(): number {
        const element = document.querySelector('.navbar');
        const navBarHeight = element.getBoundingClientRect().height;
        return navBarHeight;
    }


    updateScrolledProgress(progress: number): void {
        const element = document.getElementById('scroll-progress');
        element.style.width = `${progress * 100}vw`;
    }

    componentDidMount(): void {
        /* document.getElementById(this.state.current).style.background="#897ed3"; */

        /* this.makeContentTopEqualNavBarHeight(); */
        this.listenScrollProgress();
    }

    componentDidUpdate(): void {
    }


    makeContentTopEqualNavBarHeight(): void {
        // TODO this method does not work

        const top = this.navBarHeight;
        const el = document.getElementById("landing-page-content");
        el.style.top = `${top}px`;
    }

    listenScrollProgress() {
        window.addEventListener("scroll", () => {
            const scrolled = window.scrollY;

            if (scrolled > this.navBarHeight) {
                this.detachNavBar();
            } else {
                this.attachNavBar();
            }

            const element = document.querySelector(".landing-page-content");
            const pageHeight = element.getBoundingClientRect().height - window.innerHeight;

            this.updateScrolledProgress(scrolled / pageHeight);

        });
    }

    render(): React.ReactElement<any, any> {
        return (
            <div className="navbar">
                <div className="navbar-content">
                    <h1 className="logo" style={{ marginLeft: "10px" }}>{this.state.name}</h1>
                    <div className="navbar-left">
                        {
                            this.state.links.map((link) => {
                                return (
                                    <NavLink to={link.to} className={({ isActive }) => ["navbar-item", isActive ? "active-link" : null,].filter(Boolean).join(" ")} key={link.name}>
                                        {link.name}
                                    </NavLink>
                                );
                            })
                        }

                    </div>
                </div>
                <div id="scroll-progress"></div>
            </div>
        );
    }
}

export default NavBar;
