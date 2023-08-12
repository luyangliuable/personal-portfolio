import React, { Component, createRef } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

interface INavbarProps {
    name?: string;
    current?: string;
    scrollStatus: {
        scrolled: number | null;
        scrolling: boolean | null;
    };
}

interface INavbarState {
    name: string;
    links: { name: string, to: string }[];
    lastScrollY: number;
    hideNavBarScrollSensitivity: number;
    showBurgerPanel: boolean;
}

class NavBar extends Component<INavbarProps, INavbarState> {
    navbar = createRef<HTMLDivElement>();
    burgerPanel = createRef<HTMLDivElement>();
    burgerButton = createRef<HTMLDivElement>();
    scrollProgress = createRef<HTMLDivElement>();

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
            lastScrollY: 0,
            hideNavBarScrollSensitivity: 5,
            showBurgerPanel: false,
            name: "Luyang's Coding Portfolio"
        };
    }

    get navBarHeight(): number {
        const element = document.querySelector('.navbar');
        return element?.getBoundingClientRect().height || 0;
    }

    updateScrolledProgress = (progress: number) => {
        if (this.scrollProgress) this.scrollProgress.current.style.width = `${progress * 100}vw`;
    };

    listenDeltaScrolled = () => {
        const { scrollStatus } = this.props;
        const { lastScrollY, hideNavBarScrollSensitivity } = this.state;

        if (scrollStatus.scrolled! - lastScrollY >= hideNavBarScrollSensitivity) {
            this.hideNavBar();
        } else if (lastScrollY - scrollStatus.scrolled! >= hideNavBarScrollSensitivity) {
            this.showNavBar();
        }
    };

    listenContinuousScrolled = () => {
        const { scrollStatus } = this.props;

        if (scrollStatus.scrolled! > this.navBarHeight) {
            this.detachNavBar();
        } else {
            this.attachNavBar();
        }

        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.updateScrolledProgress(scrollStatus.scrolled! / pageHeight);
        this.setState({ lastScrollY: scrollStatus.scrolled! });
    };

    componentDidMount() {
        this.listenContinuousScrolled();

        window.addEventListener('click', (e) => {
            if (this.burgerPanel.current && !this.burgerPanel.current.contains(e.target as Node) && !this.burgerButton.current.contains(e.target as Node)) {
                this.hideBurgerMenu();
            }
        });
    }

    componentDidUpdate(prevProps: INavbarProps) {
        const { scrollStatus } = this.props;

        if (prevProps.scrollStatus.scrolling !== scrollStatus.scrolling) {
            this.listenDeltaScrolled();
        }

        if (prevProps.scrollStatus.scrolled !== scrollStatus.scrolled) {
            this.listenContinuousScrolled();
        }
    }

    attachNavBar = () => {
        this.navbar.current?.classList.remove("detached");
        this.burgerPanel.current?.classList.add("nav-burger-panel-move-lower");
    };

    detachNavBar = () => {
        this.navbar.current?.classList.add("detached");
        this.burgerPanel.current?.classList.remove("nav-burger-panel-move-lower");
    };

    hideNavBar = () => {
        this.navbar.current?.classList.add("hidden");
    };

    showNavBar = () => {
        this.navbar.current?.classList.remove("hidden");
        this.burgerPanel.current?.classList.add("nav-burger-panel-move-lower");
    };

    toggleBurgerMenu = () => {
        this.burgerPanel.current?.classList.toggle("nav-burger-panel-hide");
    };

    hideBurgerMenu = () => {
        this.burgerPanel.current?.classList.add("nav-burger-panel-hide");
    };

    renderNavLink = (link: { name: string, to: string }) => (
        <NavLink
            to={link.to}
            className={({ isActive }) => ["navbar-item", isActive ? "navbar-item active-link" : null].filter(Boolean).join(" ")}
            key={link.name}
        >
            {link.name}
        </NavLink>
    );

    render() {
        const { name, links } = this.state;

        return (
            <>
                <div className="navbar" ref={this.navbar}>
                    <div className="navbar-content">
                        <NavLink to="/" style={{ textDecoration: "none" }}>
                            <h1 className="logo">{name}</h1>
                        </NavLink>
                        <nav className="navbar-left">
                            {links.map(this.renderNavLink)}
                            <div className="selected-navlink-window">a</div>
                        </nav>
                        <div ref={this.burgerButton} className="nav-burger" onClick={this.toggleBurgerMenu}></div>
                    </div>
                    <div id="scroll-progress" ref={this.scrollProgress} />
                </div>
                <div ref={this.burgerPanel} className="nav-burger-panel nav-burger-panel-hide nav-burger-panel-move-lower">
                    {links.map(link => (
                        <NavLink
                            to={link.to}
                            className={({ isActive }) => ["burger-item", isActive ? "burger-item active-link" : null].filter(Boolean).join(" ")}
                            key={link.name}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </>
        );
    }
}

export default NavBar;
