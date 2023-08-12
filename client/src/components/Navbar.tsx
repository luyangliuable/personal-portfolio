import React, { Component, createRef, RefObject } from 'react';
import { NavLink } from 'react-router-dom';

import "./Navbar.css";

interface INavbarProps {
    name?: string,
    current?: string,
    scrollStatus: scrollStatus
}

interface INavbarState {
    name: string,
    links: { name: string, to: string }[],
    lastScrollY: number,
    hideNavBarScrollSensitivity: number,
    showBurgerPanel: boolean,
    render?: () => React.ReactElement<any, any>,
}

interface scrollStatus {
    scrolled: number | null,
    scrolling: boolean | null
}


class NavBar extends Component<INavbarProps, INavbarState> {
    navbar: RefObject<any>;
    burgerPanel: RefObject<any>;
    burgerButton: RefObject<any>;
    scrollProgress: RefObject<any>;

    constructor(props: INavbarProps) {
        super(props);
        this.state = {
            links: [
                { name: 'Home', to: '/' },
                { name: 'MyReflections', to: '/blog' },
                { name: 'MyProjects', to: '/project' },
                { name: 'Tools', to: '/tools' },
                { name: 'Resume', to: 'https://docs.google.com/document/d/18WT-J7ZP5dcEJreXIvldSm1VySQhC0DQB0GzBXGyJEQ/edit?usp=sharing' },
                { name: 'About', to: '/about' }
            ],
            lastScrollY: null,
            hideNavBarScrollSensitivity: 5,
            showBurgerPanel: false,
            name: "Luyang's Coding Portfolio"
        };

        this.navbar = createRef();
        this.scrollProgress = createRef();
        this.burgerPanel = createRef();
        this.burgerButton = createRef();
    }

    attachNavBar(): void {
        this.navbar.current.classList.remove("detached");
        this.burgerPanel.current.classList.remove("nav-burger-panel-move-lower");
    }


    detachNavBar(): void {
        this.navbar.current.classList.add("detached");
        this.burgerPanel.current.classList.remove("nav-burger-panel-move-lower");
    }

    hideNavBar(): void {
        this.navbar.current.classList.add("hidden");
    }

    showNavBar(): void {
        this.navbar.current.classList.remove("hidden");
        this.burgerPanel.current.classList.add("nav-burger-panel-move-lower");
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

        window.addEventListener('click', (e) => {
            if (this.burgerPanel.current && !this.burgerPanel.current.contains(e.target) && !this.burgerButton.current.contains(e.target)) {
                this.hideBurgerMenu();
            }
        });
    }

    componentDidUpdate(prevProps: INavbarProps, prevState: INavbarState): void {
        if (prevProps.scrollStatus.scrolling !== this.props.scrollStatus.scrolling) {
            this.listenScrollProgressForNavbar();
            this.listenScrollProgress();
        }

        if (this.state.showBurgerPanel != prevState.showBurgerPanel) {
            this.toggleBurgerMenu();
        }
    }


    listenScrollProgressForNavbar() {
        const scrollStatus = this.props.scrollStatus;

        if (scrollStatus.scrolled > this.navBarHeight) {
            this.detachNavBar();

            if (scrollStatus.scrolled - this.state.lastScrollY >= this.state.hideNavBarScrollSensitivity) {
                this.hideNavBar();
            } else if (this.state.lastScrollY - scrollStatus.scrolled >= this.state.hideNavBarScrollSensitivity) {
                this.showNavBar();
            }
        } else {
            this.attachNavBar();
        }
    }

    listenScrollProgress() {
        const scrollStatus = this.props.scrollStatus;
        const element = document.querySelector(".landing-page-content");

        if (element) {
            const pageHeight = element.getBoundingClientRect().height - window.innerHeight;
            this.updateScrolledProgress(scrollStatus.scrolled / pageHeight);
        }

        this.setState({ lastScrollY: scrollStatus.scrolled });
    }

    toggleBurgerMenu(): void {
        this.burgerPanel.current.classList.toggle("nav-burger-panel-hide");
    }


    hideBurgerMenu(): void {
        this.burgerPanel.current.classList.add("nav-burger-panel-hide");
    }

    render(): React.ReactElement<any, any> {
        return (
            <>
                <div className="navbar" ref={this.navbar}>
                    <div className="navbar-content">
                        <NavLink to="/" style={{ textDecoration: "none" }}>
                            <h1 className="logo">{this.state.name}</h1>
                        </NavLink>
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
                        <div ref={this.burgerButton} className="nav-burger" onClick={() => this.toggleBurgerMenu()}>
                        </div>
                    </div>
                    <div id="scroll-progress" ref={this.scrollProgress}>
                    </div>

                </div>
                <div ref={this.burgerPanel} className="nav-burger-panel nav-burger-panel-hide">
                    {
                        this.state.links.map((link) => {
                            return (
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) => ["burger-item", isActive ? "burger-item active-link" : null,].filter(Boolean).join(" ")} key={link.name}>
                                    {link.name}
                                </NavLink>
                            );
                        })
                    }
                </div>
            </>
        );
    }
}

export default NavBar;
