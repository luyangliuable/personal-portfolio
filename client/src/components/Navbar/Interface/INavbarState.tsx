import { ReactNode } from "react";

interface INavbarState {
    name: string;
    links: Link[];
    currentlyHoveredNavbarLinkName: string | null;
    lastScrollY: number;
    hideNavBarScrollSensitivity: number;
    navBarDetached: boolean;
    showBurgerPanel: boolean;
    dropdownMenuLinkDisplay: ReactNode[]
}

interface Link {
    name: string;
    to: string | null;
    icon?: ReactNode;
    onClick?: () => void;
    sublinks?: {
        name: string;
        to: string;
        onClick?: () => void
    }[]
}

export { INavbarState, Link };
