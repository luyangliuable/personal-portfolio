import { ReactNode, RefObject } from 'react';

interface INavBarSubMenuProps {
    currentlyHoveredNavbarSublinkItem: ReactNode,
    navbarSubmenu: RefObject<HTMLDivElement>,
}

export default INavBarSubMenuProps;
