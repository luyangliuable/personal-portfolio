interface INavbarState {
    name: string;
    links: {
        name: string,
        to: string,
        sublinks?: {
            name: string,
            to: string
        }[]
    }[];
    currentlyHoveredNavbarLinkName: string | null;
    lastScrollY: number;
    hideNavBarScrollSensitivity: number;
    navBarDetached: boolean;
    showBurgerPanel: boolean;
}

export default INavbarState;
