import { Context, Component, createRef, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { INavbarState, Link, NavbarItem } from "./Interface/INavbarState";
import INavbarProps from "./Interface/INavbarProps";
import NavBurgerPanel from "./NavBurgerPanel/NavBurgerPanel";
import BurgerMenuIcon from "./BurgerMenuIcon/BurgerMenuIcon";
import { AiOutlineDown } from "react-icons/ai";
import LoginButton from "./LoginButton/LoginButton";
import { AppContext, IAppContextProvider } from "../../stores/AppContext";
import { CiLock } from "react-icons/ci";
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
            isLocked: true,
            to: "/digital_chronicles/coding_notes",
          }, {
            name: "🏞 Scenic Memories",
            isLocked: true,
            to: "/digital_chronicles/scenic_memories",
          }, {
            name: "🧩 My Daily Leetcode",
            to: "/digital_chronicles/blogs?tag=daily-leetcode",
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
            isLocked: true,
            to: "/tools/hex_to_rgb"
          }, {
            name: "🌸 BloomChain ",
            isLocked: true,
            to: "/tools/bloomchain"
          }, {
            name: "⌛ TimeCapsule Letters",
            isLocked: true,
            to: "/tools/time_capsule_letters"
          }, {
            name: "🌐 CssCrossBrowser",
            isLocked: true,
            to: "/tools/css_cross_browser"
          }, {
            name: "✉️ AnonyLetters",
            isLocked: true,
            to: "/tools/anony_letters"
          }, {
            name: "😯 Mood Diaries",
            isLocked: true,
            to: "/tools/mood_tracker",
          },
          {
            name: "⚛️ AtomicHabits",
            isLocked: true,
            to: "/tools/atomic_habits",
          }, {
            name: "🏋️‍♂️ Gym Log",
            isLocked: true,
            to: "/tools/gym_log",
          }, {
            name: "🤝 MeetSleek",
            isLocked: true,
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
              to: "/about/teddie",
              isLocked: true
            }, {
              name: "😃 About Me",
              to: "/about/me",
              isLocked: true
            }
          ]
        }, {
          name: "Misc.",
          to: null,
          sublinks: [
            {
              name: "🎵 Music Playlist",
              to: "/misc/music_playlist",
              isLocked: true
            },
            {
              name: "🎥 Youtube Playlist",
              to: "/misc/youtube_playlist",
              isLocked: true
            }, {
              name: "⌨️ Man of the Day",
              to: "/misc/man_of_the_Day",
              isLocked: true
            }, {
              name: "📐 Algorithm of the Day",
              to: "/misc/algorithm_of_the_Day",
              isLocked: true
            }, {
              name: "🙏 Wall of Gratefulness",
              to: "/misc/wall_of_gratefulness",
              isLocked: true
            },
          ]
        }
      ],
      lastScrollY: 0,
      navBarDetached: false,
      currentlyHoveredNavbarLinkName: null,
      hideNavBarScrollSensitivity: 1,
      isNavbarHidden: false,
      name: "~/llcode.tech",
      dropdownMenuLinkDisplay: []
    };
  }

  get navBarHeight(): number {
    const element = this.navbar.current!;
    const height = element?.getBoundingClientRect().height || 0;

    return height;
  }

  updateScrolledProgress = (progress: number) => {
    if (this.scrollProgress) this.scrollProgress.current!.style.width = `${progress * 100}vw`;
  };

  listenDeltaScrolled = () => {
    const { scrollStatus } = this.props;
    const { hideNavBarScrollSensitivity } = this.state;
    const deltaScrolled = scrollStatus.deltaScrolled ?? 0;

    if (deltaScrolled >= hideNavBarScrollSensitivity && !this.state.isNavbarHidden) {
      this.hideNavBar();
    } else if (deltaScrolled <= -hideNavBarScrollSensitivity && this.state.isNavbarHidden) {
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
            const translateXValue = `calc(-${factor}*( min(var(--navbar-item-width), var(--navbar-item-max-width)) + var(--navbar-item-margin)) + var(--navbar-item-margin) )`;
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
    if (prevProps !== this.props)
      this.updateScrollingBehavior(prevProps);
  }

  private updateScrollingBehavior(prevProps: INavbarProps) {
    const { scrollStatus } = this.props;

    if (scrollStatus.deltaScrolled !== 0) {
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
    // If the navbar is not already hidden, hide it and set the navbar height to 0px
    this.navbar.current?.classList.add("hidden");
    document.documentElement.style.setProperty('--navbar-height', '0px');

    this.setState({
      ...this.state,
      isNavbarHidden: true
    });
  };

  showNavBar = () => {
    this.navbar.current?.classList.remove("hidden");

    // Connascence of value here /Users/blackfish/personal-portfolio/client/src/App.css:5
    document.documentElement.style.setProperty('--navbar-height', `${this.navBarHeight}px`);

    this.setState({
      ...this.state,
      isNavbarHidden: false
    });
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

  renderNavLink = (link: NavbarItem) => {
    const navLinkContent = [
      link.name,
      link.icon,
      link.sublinks && <AiOutlineDown key="down-icon" />,
      link.isLocked && <CiLock key="lock-icon" />
    ].filter(Boolean); // This will keep only truthy values in the array

    const targetPath = link.isLocked ? null : link.to;

    return (
      <NavLink
        to={targetPath}
        className={({ isActive }) => ["navbar-item", (isActive && targetPath) ? "navbar-item active-link" : null].filter(Boolean).join(" ")}
        key={link.name}
        onMouseOver={() => this.renderDropdownMenu(this.state.links.filter(item => item.name === link.name)[0].sublinks)}>
        {navLinkContent}
      </NavLink>
    );
  }

  render() {
    const { name, links } = this.state;

    return (
      <>
        <div
          className="navbar grid-background--dot"
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
                <div ref={this.navbarSubmenu} className="navbar-item__dropdown ">
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
