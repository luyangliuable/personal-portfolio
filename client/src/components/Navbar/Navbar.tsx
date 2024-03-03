import React, { useMemo, useState, useCallback, createRef, ReactNode, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { INavbarState, Link, NavbarItem } from "./Interface/INavbarState";
import { FaArrowCircleUp } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import INavbarProps from "./Interface/INavbarProps";
import NavBurgerPanel from "./NavBurgerPanel/NavBurgerPanel";
import BurgerMenuIcon from "./BurgerMenuIcon/BurgerMenuIcon";
import LoginButton from "./LoginButton/LoginButton";
import linksData from "../../configs/links.json";
import { useTraceUpdate } from "../Utility/DebugUtility";
import "./Navbar.css";

const NavBar: React.FC<INavbarProps> = (props) => {
    const { scrollStatus } = props;

    const navbar = useRef<HTMLDivElement>();
    const navbarLeft = useRef<HTMLDivElement>();
    const selectedNavlinkWindow = useRef<HTMLDivElement>();
    const burgerPanel = useRef<HTMLDivElement>();
    const burgerButton = useRef<HTMLDivElement>();
    const scrollProgress = useRef<HTMLDivElement>();
    const navbarSubmenu = useRef<HTMLDivElement>();

    const [navBarHeight, setNavBarHeight] = useState(0);

    const links = useMemo(() => {
        return linksData.links
    }, [])

    const websiteName = "~/llcode.tech" as const;

    const [state, setState] = useState<INavbarState>({
        lastScrollY: 0,
        navBarDetached: false,
        currentlyHoveredNavbarLinkName: null,
        hideNavBarScrollSensitivity: 1,
        isNavbarHidden: false,
        dropdownMenuLinkDisplay: []
    });

    useEffect(() => {
        const element = navbar.current!;
        const height = element?.getBoundingClientRect().height || 0;
        setNavBarHeight(height);
    }, [])

    const updateScrolledProgress = (progress: number) => {
        if (scrollProgress) {
            scrollProgress.current!.style.width = `${progress * 100}vw`;
            const blueEnd = 95 + progress * 4.5;
            scrollProgress.current!.style.background = `linear-gradient(to right,  var(--dark-mode-purple-2), ${blueEnd}%, #00bfff)`;

            if (progress === 1) {
                scrollProgress.current!.classList.add("scroll-progress-complete");
                scrollProgress.current!.style.background = "orange";
            } else {
                scrollProgress.current!.classList.remove("scroll-progress-complete");
            }
        }
    };

    const listenDeltaScrolled = () => {
        const { hideNavBarScrollSensitivity, isNavbarHidden } = state;
        const deltaScrolled = scrollStatus.deltaScrolled ?? 0;

        if (deltaScrolled >= hideNavBarScrollSensitivity && !isNavbarHidden) {
            hideNavBar();
        } else if (deltaScrolled <= -hideNavBarScrollSensitivity && isNavbarHidden) {
            showNavBar();
        }
    };

    const listenContinuousScrolled = () => {
        if (!state.navBarDetached && scrollStatus.scrolled! >= navBarHeight) {
            detachNavBar();
        } else if (scrollStatus.scrolled! < navBarHeight) {
            attachNavBar();
        }

        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        updateScrolledProgress(scrollStatus.scrolled! / pageHeight);
    };

    const addBurgerClickOutEventLister = () => {
        window.addEventListener("click", (e) => {
            if (burgerPanel.current && !burgerPanel.current.contains(e.target as Node) && !burgerButton.current!.contains(e.target as Node)) {
                hideBurgerMenu();
            }
        });
    }

    useEffect(() => {
        initializeNavBar();
        setupNavHoverEffect();
    }, [])

    const setupNavHoverEffect = () => {
        const navbarLeftTarget = navbarLeft.current!;
        const selectedNavlinkWindowTarget = selectedNavlinkWindow.current!;

        if (navbarLeftTarget && selectedNavlinkWindow) {
            Array.from(navbarLeftTarget.children).forEach((child, index) => {
                if (child !== selectedNavlinkWindowTarget) {
                    child.addEventListener("mouseover", () => {
                        const factor = navbarLeftTarget.children.length - index - 1;
                        const translateXValue = `calc(-${factor}*( min(var(--navbar-item-width), var(--navbar-item-max-width)) + var(--navbar-item-margin)) + var(--navbar-item-margin) )`;
                        selectedNavlinkWindowTarget.style.setProperty("--dynamic-translate", `${translateXValue}`);
                    });
                }
            });
        }
    }

    const initializeNavBar = () => {
        listenContinuousScrolled();
        updateScrolledProgress(0);
        addBurgerClickOutEventLister();
    }

    useEffect(() => {
        updateScrollingBehavior();
    }, [scrollStatus.deltaScrolled]);

    useEffect(() => {
        listenContinuousScrolled()
    }, [scrollStatus.scrolled])

    const updateScrollingBehavior = () => {
        if (scrollStatus.deltaScrolled !== 0) listenDeltaScrolled();
    }

    const attachNavBar = () => {
        navbar.current?.classList.remove("detached");
        burgerPanel.current?.classList.add("nav-burger-panel-move-lower");
        setState(prev => {
            return {
                ...prev,
                navBarDetached: false
            };
        });
    }

    const detachNavBar = () => {
        navbar.current?.classList.add("detached");
        burgerPanel.current?.classList.remove("nav-burger-panel-move-lower");
        setState(prev =>{
            return {
                ...prev,
                navBarDetached: true
            }
        });
    };

    const hideNavBar = () => {
        // If the navbar is not already hidden, hide it and set the navbar height to 0px
        navbar.current?.classList.add("hidden");
        document.documentElement.style.setProperty('--navbar-height', '0px');
        setState(prev => {
            return {
                ...prev,
                isNavbarHidden: true
            }
        });
    };

    const showNavBar = () => {
        navbar.current?.classList.remove("hidden");
        // Connascence of value here /Users/blackfish/personal-portfolio/client/src/App.css:5
        document.documentElement.style.setProperty('--navbar-height', `${navBarHeight}px`);
        setState(prev => {
            return {
                ...prev,
                isNavbarHidden: false
            }
        });
    };

    const toggleBurgerMenu = () => {
        burgerPanel.current?.classList.toggle("nav-burger-panel-hide");
    };

    const hideBurgerMenu = () => {
        burgerPanel.current?.classList.add("nav-burger-panel-hide");
    };

    const hideDropdownMenu = () => {
        navbarSubmenu.current?.classList.remove("show-navbar-dropdown");
        selectedNavlinkWindow.current?.classList.remove("show-navbar-dropdown");
    }

    const showDropdownMenu = () => {
        navbarSubmenu.current?.classList.add("show-navbar-dropdown");
        selectedNavlinkWindow.current?.classList.add("show-navbar-dropdown");
    }

    const renderDropdownMenu = (links: Link[] | undefined): ReactNode | void => {
        if (links !== undefined) {
            showDropdownMenu();

            setState(( prev ) => {
                return {
                    ...prev,
                    dropdownMenuLinkDisplay: links.map((item, _) => renderNavLink(item))
                }
            });

            if (state.dropdownMenuLinkDisplay.length === 0) hideDropdownMenu();
        } else {
            hideDropdownMenu();
        }
    }

    const renderNavLink = (link: NavbarItem, isSubLink: boolean = true) => {
        // https://mikebifulco.com/posts/javascript-filter-boolean
        const navLinkContent = [
            link.name,
            link.icon,
            link.sublinks && <AiOutlineDown key="down-icon" />,
            link.isLocked && <CiLock key="lock-icon" />
        ].filter(Boolean);
        const targetPath = link.isLocked ? null : link.to;
        const onMouseOverAction = isSubLink ? () => {} : () => renderDropdownMenu(links.filter(item => item.name === link.name)[0].sublinks);
        return (
            <NavLink
                to={targetPath}
                className={({ isActive }) => {
                    let classes = ["navbar-item", "flex", "justify-center", "items-center"];
                    if (isActive && targetPath) {
                        const currentSearchParams = new URLSearchParams(window.location.search);
                        const targetSearchParams = new URLSearchParams(new URL(targetPath, window.location.href).search);
                        const isQueryParamSame = [...targetSearchParams].every(([key, value]) => currentSearchParams.get(key) === value);

                        if (isQueryParamSame) {
                            classes.push("active-link");
                        }
                    }
                    return classes.filter(Boolean).join(" ");
                }}
                key={link.name}
                onMouseOver={onMouseOverAction}>
                {navLinkContent}
            </NavLink>
        );
    };

    return (
        <>
            <article className="navbar" onMouseLeave={() => hideDropdownMenu()} ref={navbar}>
                <section className="navbar-content flex items-center">
                    <div className="logo__wrapper">
                        <NavLink to="/"><h1 className="logo">{websiteName}</h1></NavLink>
                    </div>
                    <nav ref={navbarLeft} className="navbar-left flex flex-row">
                        {links.map((item, _) => renderNavLink(item, false))}
                        <LoginButton onMouseOver={renderDropdownMenu} />
                        <section ref={selectedNavlinkWindow} className="selected-navlink-window flex items-center">
                            <div ref={navbarSubmenu} className="navbar-item__dropdown ">
                                {state.dropdownMenuLinkDisplay}
                            </div>
                        </section>
                    </nav>
                    <div ref={burgerButton} className="nav-burger" onClick={toggleBurgerMenu}><BurgerMenuIcon /></div>
                </section>
                <aside id="scroll-progress" ref={scrollProgress}>
                    <FaArrowCircleUp />
                </aside>
            </article>
            <NavBurgerPanel links={links} burgerPanel={burgerPanel} />
        </>
    );
}

export default NavBar;
