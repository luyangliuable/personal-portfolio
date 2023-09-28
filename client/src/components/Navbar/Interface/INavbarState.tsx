interface INavbarState {
  name: string;
  links: Link[];
  currentlyHoveredNavbarLinkName: string | null;
  lastScrollY: number;
  hideNavBarScrollSensitivity: number;
  navBarDetached: boolean;
  showBurgerPanel: boolean;
}

interface Link {
  name: string,
  to: string | null,
  sublinks?: {
    name: string,
    to: string
  }[]
}

export { INavbarState, Link };
