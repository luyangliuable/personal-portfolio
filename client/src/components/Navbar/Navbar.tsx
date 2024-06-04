import React, { useMemo, useState, ReactNode, useEffect, useRef } from "react";
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
import "./Navbar.css";

const NavBar: React.FC<INavbarProps> = (props) => {
    const { scrollStatus } = props;

    const navbar = useRef<HTMLDivElement>(null);
    const navbarLeft = useRef<HTMLDivElement>(null);
    const selectedNavlinkWindow = useRef<HTMLDivElement>(null);
    const burgerPanel = useRef<HTMLDivElement>(null);
    const burgerButton = useRef<HTMLDivElement>(null);
    const scrollProgress = useRef<HTMLDivElement>(null);
    const navbarSubmenu = useRef<HTMLDivElement>(null);

    const [navBarHeight, setNavBarHeight] = useState(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const links = useMemo(() => {
        return linksData.links;
    }, []);

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
        const element = navbar.current;
        const height = element?.getBoundingClientRect().height || 0;
        setNavBarHeight(height);
    }, [isLoaded]);

    const updateScrolledProgress = (progress: number) => {
        if (isLoaded && scrollProgress.current) {
            scrollProgress.current.style.width = `${progress * 100}vw`;
            const blueEnd = 95 + progress * 4.5;
            scrollProgress.current.style.background = `linear-gradient(to right, var(--dark-mode-purple-2), ${blueEnd}%, #00bfff)`;

            /* if (progress === 1) {
*     scrollProgress.current.classList.add("scroll-progress-complete");
*     scrollProgress.current.style.background = "orange";
* } else {
*     scrollProgress.current.classList.remove("scroll-progress-complete");
* } */
        }
    };

    const listenDeltaScrolled = () => {
        const { hideNavBarScrollSensitivity, isNavbarHidden } = state;
        const deltaScrolled = scrollStatus.deltaScrolled ?? 0;
        if (deltaScrolled >= hideNavBarScrollSensitivity && !isNavbarHidden && state.navBarDetached) {
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

    const addBurgerClickOutEventListener = () => {
        window.addEventListener("click", hideBurgerMenu);
    };

    const setupNavHoverEffect = () => {
        const navbarLeftTarget = navbarLeft.current!;
        const selectedNavlinkWindowTarget = selectedNavlinkWindow.current!;

        if (isLoaded && navbarLeftTarget && selectedNavlinkWindowTarget) {
            Array.from(navbarLeftTarget.children).forEach((child, index) => {
                if (child !== selectedNavlinkWindowTarget) {
                    child.addEventListener("mouseover", () => {
                        const factor = navbarLeftTarget.children.length - index - 1;
                        const translateXValue = `calc(-${factor}*(min(var(--navbar-item-width), var(--navbar-item-max-width)) + var(--navbar-item-margin)) + var(--navbar-item-margin))`;
                        selectedNavlinkWindowTarget.style.setProperty("--dynamic-translate", translateXValue);
                    });
                }
            });
        }
    };

    const initializeNavBar = () => {
        listenContinuousScrolled();
        updateScrolledProgress(0);
        if (window.innerWidth < 900) addBurgerClickOutEventListener();
    };

    useEffect(() => {
        updateScrollingBehavior();
    }, [scrollStatus.deltaScrolled]);

    useEffect(() => {
        listenContinuousScrolled();
    }, [scrollStatus.scrolled]);

    const updateScrollingBehavior = () => {
        if (scrollStatus.deltaScrolled !== 0) listenDeltaScrolled();
    };

    const attachNavBar = () => {
        navbar.current?.classList.remove("detached");
        burgerPanel.current?.classList.add("nav-burger-panel-move-lower");
        setState(prev => ({
            ...prev,
            navBarDetached: false
        }));
    };

    const detachNavBar = () => {
        navbar.current?.classList.add("detached");
        burgerPanel.current?.classList.remove("nav-burger-panel-move-lower");
        setState(prev => ({
            ...prev,
            navBarDetached: true
        }));
    };

    const hideNavBar = () => {
        navbar.current?.classList.add("hidden");
        document.documentElement.style.setProperty('--navbar-height', '0px');
        setState(prev => ({
            ...prev,
            isNavbarHidden: true
        }));
    };

    const showNavBar = () => {
        navbar.current?.classList.remove("hidden");
        document.documentElement.style.setProperty('--navbar-height', `${navBarHeight}px`);
        setState(prev => ({
            ...prev,
            isNavbarHidden: false
        }));
    };

    const toggleBurgerMenu = () => {
        burgerPanel.current?.classList.toggle("nav-burger-panel-hide");
    };

    const hideBurgerMenu = (e: any) => {
        if (burgerPanel.current && !burgerPanel.current.contains(e.target as Node) && !burgerButton.current?.contains(e.target as Node)) {
            burgerPanel.current?.classList.add("nav-burger-panel-hide");
        }
    };

    const hideDropdownMenu = () => {
        navbarSubmenu.current?.classList.remove("show-navbar-dropdown");
        selectedNavlinkWindow.current?.classList.remove("show-navbar-dropdown");
    };

    const showDropdownMenu = () => {
        navbarSubmenu.current?.classList.add("show-navbar-dropdown");
        selectedNavlinkWindow.current?.classList.add("show-navbar-dropdown");
    };

    const renderDropdownMenu = (links: Link[] | undefined): ReactNode | void => {
        if (links !== undefined) {
            showDropdownMenu();
            setState(prev => ({
                ...prev,
                dropdownMenuLinkDisplay: links.map(item => renderNavLink(item))
            }));
            if (links.length === 0) hideDropdownMenu();
        } else {
            hideDropdownMenu();
        }
    };

    const renderNavLink = (link: NavbarItem, isSubLink: boolean = true) => {
        const navLinkContent = [
            link.name,
            link.icon,
            link.sublinks && <AiOutlineDown key="down-icon" />,
            link.isLocked && <CiLock key="lock-icon" />
        ].filter(Boolean);
        const targetPath = link.isLocked ? null : link.to;
        const onMouseOverAction = isSubLink ? () => {} : () => renderDropdownMenu(links.find(item => item.name === link.name)?.sublinks);
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

    const navBarMainSection = useMemo(() => (
        <section className="navbar-content flex items-center">
            <div className="logo__wrapper">
                <NavLink to="/"><h1 className="logo">{websiteName}</h1></NavLink>
            </div>
            <nav ref={navbarLeft} className="navbar-left flex flex-row">
                {links.map(item => renderNavLink(item, false))}
                <LoginButton onMouseOver={renderDropdownMenu} />
                <section ref={selectedNavlinkWindow} className="selected-navlink-window flex items-center">
                    <div ref={navbarSubmenu} className="navbar-item__dropdown">
                        {state.dropdownMenuLinkDisplay}
                    </div>
                </section>
            </nav>
            <div ref={burgerButton} className="nav-burger" onClick={toggleBurgerMenu}><BurgerMenuIcon /></div>
        </section>
    ), [state.dropdownMenuLinkDisplay]);

    const navbarBurgerPanel = useMemo(() => (
        <NavBurgerPanel links={links} burgerPanel={burgerPanel} />
    ), [links]);

    useEffect(() => {
        initializeNavBar();
        setupNavHoverEffect();

        return () => {
            window.removeEventListener("click", hideBurgerMenu);
        };
    }, [isLoaded]);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!isLoaded) {
        return (<></>);
    }

    return (
        <>
            <article className="navbar" onMouseLeave={hideDropdownMenu} ref={navbar}>
                {navBarMainSection}
                <aside id="scroll-progress" ref={scrollProgress}>
                    <FaArrowCircleUp />
                </aside>
            </article>
            {navbarBurgerPanel}
        </>
    );
}

export default NavBar;
