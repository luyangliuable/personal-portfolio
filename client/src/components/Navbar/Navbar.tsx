import React, { Component, createRef } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import INavbarState from "./Interface/INavbarState";
import INavbarProps from "./Interface/INavbarProps";
import NavbarBurger from "./NavbarBurger/NavbarBurger";

class NavBar extends Component<INavbarProps, INavbarState> {
    navbar = createRef<HTMLDivElement>();
    burgerPanel = createRef<HTMLDivElement>();
    burgerButton = createRef<HTMLDivElement>();
    scrollProgress = createRef<HTMLDivElement>();
    navbarSubmenu = createRef<HTMLDivElement>();

    constructor(props: INavbarProps) {
        super(props);
        this.state = {
            links: [
                { name: "Home", to: "/" },
                {
                    name: "Digital Chronicles",
                    to: "/digital_chronicles",
                    sublinks: [{
                        name: "💻 Posts",
                        to: "/digital_chronicles/blogs",
                    }, {
                        name: "📝 Daily Reflections",
                        to: "/digital_chronicles/daily_refletions",
                    }, {
                        name: "🧑‍💻 Coding Notes",
                        to: "/digital_chronicles/coding_notes",
                    }, {
                        name: "🏞 Scenic Memories",
                        to: "/digital_chronicles/scenic_memories",
                    },

                    ]
                },
                {
                    name: "Projects",
                    to: "/projects",
                    sublinks: [{
                        name: "🏗︎ Coding Projects",
                        to: "/projects/code",
                    }, {
                        name: "🖨️ 3D Printing",
                        to: "/projects/3d_printing",
                    }, {
                        name: "🤖 Hardware",
                        to: "/projects/hardware",
                    }
                    ]
                },
                {
                    name: "Tools",
                    to: "/tools",
                    sublinks: [{
                        name: "🌉 HexaBridger",
                        to: "/tools/hex_to_rgb",
                    }, {
                        name: "⌛ TimeCapsule Letters",
                        to: "/tools/time_capsule_letters"
                    }, {
                        name: "🗔 CSSCrossBrowser",
                        to: "/tools/css_cross_browser"
                    }, {
                        name: "✉️ AnonyLetters",
                        to: "/tools/anony_letters"
                    }, {
                        name: "😯 Mood Tracker",
                        to: "/tools/mood_tracker",
                    }, {
                        name: "🏋️‍♂️ Gym Log",
                        to: "/tools/gym_log",
                    }, {
                        name: "🤝 MeetSleek",
                        to: "/tools/meet_sleek",
                    }]
                },
                {
                    name: "Resume",
                    to: "/resume"
                },
                {
                    name: "About",
                    to: "/about",
                    sublinks: [
                        {
                            name: "🐩 Teddie the Dog",
                            to: "/about/teddie"
                        }, {
                            name: "😃 About Me",
                            to: "/about/me"
                        }
                    ]
                }
            ],
            lastScrollY: 0,
            navBarDetached: false,
            currentlyHoveredNavbarLinkName: null,
            hideNavBarScrollSensitivity: 1,
            showBurgerPanel: false,
            name: "~/llcode.tech"
        };
    }

    get navBarHeight(): number {
        const element = document.querySelector(".navbar");
        return element?.getBoundingClientRect().height || 0;
    }

    updateScrolledProgress = (progress: number) => {
        if (this.scrollProgress) this.scrollProgress.current.style.width = `${progress * 100}vw`;
    };

    listenDeltaScrolled = () => {
        const { scrollStatus } = this.props;
        const { lastScrollY, hideNavBarScrollSensitivity } = this.state;

        // max because safari is stupid and it sometimes goes to negative scroll positions
        if (scrollStatus.scrolled - Math.max(0, lastScrollY) >= hideNavBarScrollSensitivity) {
            this.hideNavBar();
        } else if (Math.max(0, lastScrollY - scrollStatus.scrolled) >= hideNavBarScrollSensitivity) {
            this.showNavBar();
        }
    };

    listenContinuousScrolled = () => {
        const { scrollStatus } = this.props;

        if (!this.state.navBarDetached && scrollStatus.scrolled >= this.navBarHeight) {
            this.detachNavBar();
        } else if (scrollStatus.scrolled < this.navBarHeight) {
            this.attachNavBar();
        }

        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.updateScrolledProgress(scrollStatus.scrolled! / pageHeight);
        this.setState({ lastScrollY: scrollStatus.scrolled! });
    };

    addBurgerClickOutEventLister() {
        window.addEventListener("click", (e) => {
            if (this.burgerPanel.current && !this.burgerPanel.current.contains(e.target as Node) && !this.burgerButton.current.contains(e.target as Node)) {
                this.hideBurgerMenu();
            }
        });
    }

    componentDidMount() {
        this.listenContinuousScrolled();

        this.updateScrolledProgress(0);

        this.addBurgerClickOutEventLister();
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
        this.setState({
            ...this.state,
            navBarDetached: false
        });
    };

    detachNavBar = () => {
        this.navbar.current?.classList.add("detached");
        this.burgerPanel.current?.classList.remove("nav-burger-panel-move-lower");
        this.setState({
            ...this.state,
            navBarDetached: true
        });
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

    renderSubmenu = (ancesterLinkName: string) => {
        if (this.state.links.filter(item => item.name === ancesterLinkName)[0].sublinks) {
            this.navbarSubmenu.current?.classList.add("show-navbar-submenu");
            this.setState({
                ...this.state,
                currentlyHoveredNavbarLinkName: ancesterLinkName
            });
        } else {
            this.navbarSubmenu.current?.classList.remove("show-navbar-submenu");
        }
    }

    resetSubmenu = () => {
        this.navbarSubmenu.current?.classList.remove("show-navbar-submenu");
    }

    renderNavLink = (link: { name: string, to: string }) => {
        const name = link.name;

        return (
            <NavLink
                to={link.to}
                className={({ isActive }) => ["navbar-item", isActive ? "navbar-item active-link" : null].filter(Boolean).join(" ")}
                key={link.name}
                onMouseOver={() => this.renderSubmenu(link.name)}
            >
                {link.name}
            </NavLink>
        );
    }

    render() {
        const { name, links } = this.state;
        const currentlyHoveredNavbarLinkName = this.state.currentlyHoveredNavbarLinkName;

        return (
            <>
                <div
                    className="navbar"
                    onMouseLeave={() => this.resetSubmenu()}
                    ref={this.navbar}>
                    <div className="navbar-content">
                        <NavLink to="/" style={{ textDecoration: "none" }}>
                            <h1 className="logo">{name}</h1>
                        </NavLink>
                        <nav className="navbar-left">
                            {links.map(this.renderNavLink)}
                            <div className="selected-navlink-window"></div>
                        </nav>
                        <div ref={this.burgerButton} className="nav-burger" onClick={this.toggleBurgerMenu}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#f2f2f2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="navbar-burger-icon" >
                                <path d="M3 12h18M3 6h18M3 18h18">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div id="scroll-progress" ref={this.scrollProgress} />
                    <div className="navbar-submenu" ref={this.navbarSubmenu}>
                        {
                            this.state.currentlyHoveredNavbarLinkName
                            && links.filter(item => item.name === currentlyHoveredNavbarLinkName)[0].sublinks!.map(this.renderNavLink)
                        }
                    </div>
                </div>


                <div ref={this.burgerPanel} className="nav-burger-panel nav-burger-panel-hide nav-burger-panel-move-lower">
                    {
                        links.map(link => (
                            <NavLink
                                to={link.to}
                                className={({ isActive }) => ["burger-item", isActive ? "burger-item active-link" : null].filter(Boolean).join(" ")}
                                key={link.name}
                            >
                                {link.name}
                            </NavLink>
                        ))
                    }
                </div>
            </>
        );
    }
}

export default NavBar;
