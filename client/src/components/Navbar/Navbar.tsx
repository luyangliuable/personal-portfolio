import { Context, Component, createRef, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { INavbarState, Link } from "./Interface/INavbarState";
import INavbarProps from "./Interface/INavbarProps";
import NavBurgerPanel from "./NavBurgerPanel/NavBurgerPanel";
import BurgerMenuIcon from "./BurgerMenuIcon/BurgerMenuIcon";
import { AiOutlineDown } from "react-icons/ai";
import LoginButton from "./LoginButton/LoginButton";
import { AppContext, IAppContextProvider } from "../../stores/AppContext";
import "./Navbar.css";

class NavBar extends Component<INavbarProps, INavbarState> {
    static contextType: Context<IAppContextProvider> = AppContext;

    navbar = createRef<HTMLDivElement>();
    navbarLeft = createRef<HTMLDivElement>();
    selectedNavlinkWindow = createRef<HTMLDivElement>();
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
                    name: "Blogs",
                    to: "/digital_chronicles",
                    sublinks: [{
                        name: "💻 Posts",
                        to: "/digital_chronicles/blogs",
                    }, {
                        name: "🧑‍💻 Coding Notes",
                        to: "/digital_chronicles/coding_notes",
                    }, {
                        name: "🏞 Scenic Memories",
                        to: "/digital_chronicles/scenic_memories",
                    }, {
                        name: "🧩 My Daily Leetcode",
                        to: "/digital_chronicles/daily_leetcode",
                    },
                    ]
                },
                {
                    name: "Projects",
                    to: "/projects/code",
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
                    to: null,
                    sublinks: [{
                        name: "🌉 HexaBridger",
                        to: "/tools/hex_to_rgb",
                    }, {
                        name: "⌛ TimeCapsule Letters",
                        to: "/tools/time_capsule_letters"
                    }, {
                        name: "🌐 CssCrossBrowser",
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
                    to: null,
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
            name: "~/llcode.tech",
            dropdownMenuLinkDisplay: []
        };
    }

    get navBarHeight(): number {
        const selectedNavlinkWindow = this.selectedNavlinkWindow.current!;

        const element = this.navbar.current!;
        const height = element?.getBoundingClientRect().height || 0;
        selectedNavlinkWindow.style.setProperty("--navbar-height", `${height}px`);

        return height;
    }

    updateScrolledProgress = (progress: number) => {
        if (this.scrollProgress) this.scrollProgress.current!.style.width = `${progress * 100}vw`;
    };

    listenDeltaScrolled = () => {
        const { scrollStatus } = this.props;
        const { lastScrollY, hideNavBarScrollSensitivity } = this.state;

        if (scrollStatus.scrolled! - Math.max(0, lastScrollY) >= hideNavBarScrollSensitivity) {
            this.hideNavBar();
        } else if (Math.max(0, lastScrollY - scrollStatus.scrolled!) >= hideNavBarScrollSensitivity) {
            this.showNavBar();
        }
    };

    listenContinuousScrolled = () => {
        const { scrollStatus } = this.props;

        if (!this.state.navBarDetached && scrollStatus.scrolled! >= this.navBarHeight) {
            this.detachNavBar();
        } else if (scrollStatus.scrolled! < this.navBarHeight) {
            this.attachNavBar();
        }

        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.updateScrolledProgress(scrollStatus.scrolled! / pageHeight);
        this.setState({ lastScrollY: scrollStatus.scrolled! });
    };

    addBurgerClickOutEventLister() {
        window.addEventListener("click", (e) => {
            if (this.burgerPanel.current && !this.burgerPanel.current.contains(e.target as Node) && !this.burgerButton.current!.contains(e.target as Node)) {
                this.hideBurgerMenu();
            }
        });
    }

    componentDidMount(): void {
        this.initializeNavBar();
        this.setupNavHoverEffect();
    }

    private setupNavHoverEffect() {
        const navbarLeft = this.navbarLeft.current!;
        const selectedNavlinkWindow = this.selectedNavlinkWindow.current!;

        if (navbarLeft && selectedNavlinkWindow) {
            Array.from(navbarLeft.children).forEach((child, index) => {
                if (child !== selectedNavlinkWindow) {
                    child.addEventListener("mouseover", () => {
                        const factor = navbarLeft.children.length - index - 1;
                        const translateXValue = `calc(-${factor}*( var(--navbar-item-width) + var(--navbar-item-margin)) + var(--navbar-item-margin) )`;
                        selectedNavlinkWindow.style.setProperty("--dynamic-translate", `${translateXValue}`);
                    });
                }
            });
        }
    }

    private initializeNavBar() {
        this.listenContinuousScrolled();
        this.updateScrolledProgress(0);
        this.addBurgerClickOutEventLister();
    }

    componentDidUpdate(prevProps: INavbarProps) {
        this.updateScrollingBehavior(prevProps);
    }

    private updateScrollingBehavior(prevProps: INavbarProps) {
        const { scrollStatus } = this.props;
        if (scrollStatus.scrolling !== prevProps.scrollStatus.scrolling) {
            this.listenDeltaScrolled();
        }

        if (scrollStatus.scrolled !== prevProps.scrollStatus.scrolled) {
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
        this.burgerPanel.current?.classList.remove("nav-burger-panel-move-lower");
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

    hideDropdownMenu = () => {
        this.navbarSubmenu.current?.classList.remove("show-navbar-dropdown");
        this.selectedNavlinkWindow.current?.classList.remove("show-navbar-dropdown");
    }

    showDropdownMenu = () => {
        this.navbarSubmenu.current?.classList.add("show-navbar-dropdown");
        this.selectedNavlinkWindow.current?.classList.add("show-navbar-dropdown");
    }

    renderDropdownMenu = (links: Link[]): ReactNode | void => {
        if (links !== undefined) {
            this.showDropdownMenu();
            this.setState({ dropdownMenuLinkDisplay: links.map(this.renderNavLink) });
        } else {
            this.hideDropdownMenu();
        }
    }

    renderNavLink = (link: Link) => {
        return (
            <NavLink
                to={link.to}
                onClick={() => link.onClick()}
                className={({ isActive }) => ["navbar-item", (isActive && link.to !== null) ? "navbar-item active-link" : null].filter(Boolean).join(" ")}
                key={link.name}
                onMouseOver={() => this.renderDropdownMenu(this.state.links.filter(item => item.name === link.name)[0].sublinks)}>
                {link.name}{link.icon}{link.sublinks && (<AiOutlineDown />)}
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
                    onMouseLeave={() => this.hideDropdownMenu()}
                    ref={this.navbar}>
                    <div className="navbar-content">
                        <NavLink to="/" style={{ textDecoration: "none" }}>
                            <h1 className="logo">{name}</h1>
                        </NavLink>
                        <nav ref={this.navbarLeft} className="navbar-left">
                            {links.map(this.renderNavLink)}
                            <LoginButton
                                onMouseOver={this.renderDropdownMenu}
                            />
                            <div ref={this.selectedNavlinkWindow} className="selected-navlink-window">
                                <div ref={this.navbarSubmenu} className="navbar-item__dropdown">
                                    {this.state.dropdownMenuLinkDisplay}
                                </div>
                            </div>
                        </nav>
                        <div ref={this.burgerButton} className="nav-burger" onClick={this.toggleBurgerMenu}>
                            <BurgerMenuIcon />
                        </div>
                    </div>
                    <div id="scroll-progress" ref={this.scrollProgress} />
                </div>

                <NavBurgerPanel links={links} burgerPanel={this.burgerPanel} />
            </>
        );
    }
}

export default NavBar;
