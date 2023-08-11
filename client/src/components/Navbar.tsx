import React, { Component, createRef, RefObject } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

type Props = {
    name?: string,
    current?: string,
}

interface AbcState {
    name: string,
    links: { name: string, to: string }[],
    lastScrollY: number,
    hideNavBarScrollSensitivity: number,
    render?: () => React.ReactElement<any, any>,
}


class NavBar extends Component<{}, AbcState> {
    navbar: RefObject<any>

    constructor(props: Props) {
        super(props);
        this.state = {
            links: [
                { name: 'Home', to: '/' },
                { name: 'Blog', to: '/blog' },
                { name: 'Projects', to: '/project' },
                { name: 'Tools', to: '/tools' }
            ],
            lastScrollY: null,
            hideNavBarScrollSensitivity: 10,
            name: "Luyang's Coding Portfolio",
        };

        this.navbar = createRef();
    }

    attachNavBar(): void {
        this.navbar.current.classList.remove("detached");
    }


    detachNavBar(): void {
        this.navbar.current.classList.add("detached");
    }

    hideNavBar(): void {
        this.navbar.current.classList.add("hidden");
    }

    showNavBar(): void {
        this.navbar.current.classList.remove("hidden");
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
        this.listenScrollProgress();
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
                if (scrolled - this.state.lastScrollY > this.state.hideNavBarScrollSensitivity) {
                    this.hideNavBar();
                } else if (this.state.lastScrollY - scrolled > this.state.hideNavBarScrollSensitivity) {
                    this.showNavBar();
                }
            } else {
                this.attachNavBar();
            }

            const element = document.querySelector(".landing-page-content");

            if (element) {
                const pageHeight = element.getBoundingClientRect().height - window.innerHeight;
                this.updateScrolledProgress(scrolled / pageHeight);
            }


            this.setState({ lastScrollY: scrolled });

        });
    }

    render(): React.ReactElement<any, any> {
        return (
            <div className="navbar" ref={this.navbar}>
                <div className="navbar-content">
                    <h1 className="logo" style={{ marginLeft: "10px" }}>{this.state.name}</h1>
                    <nav className="navbar-left">
                        {
                            this.state.links.map((link) => {
                                return (
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) => ["navbar-item", isActive ? "navbar-item active-link" : null,].filter(Boolean).join(" ")} key={link.name}>
                                        {link.name}
                                    </NavLink>
                                );
                            })
                        }
                        <div className="selected-navlink-window">a</div>
                    </nav>
                </div>
                <div id="scroll-progress"></div>
            </div>
        );
    }
}

export default NavBar;
