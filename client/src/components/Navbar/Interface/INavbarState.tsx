import { ReactNode } from "react";

interface Link {
    name: string;
    icon?: ReactNode;
    to: string;
    isLocked?: boolean;
    onClick?: () => void;
}

interface NavbarItem extends Link {
    sublinks?: Link[];
}

interface INavbarState {
    currentlyHoveredNavbarLinkName: string | null;
    lastScrollY: number;
    isNavbarHidden: boolean;
    hideNavBarScrollSensitivity: number;
    navBarDetached: boolean;
    dropdownMenuLinkDisplay: ReactNode[];
}

export { INavbarState, Link, NavbarItem };
