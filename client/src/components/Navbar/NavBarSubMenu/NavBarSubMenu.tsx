import INavBarSubMenuProps from "./Interface/INavBarSubMenuProps";
import { Component } from "react";

class NavBarSubMenu extends Component<INavBarSubMenuProps, {}> {
    constructor(props: INavBarSubMenuProps) {
        super(props);
    }

    render() {
        return (
            <div className="navbar-submenu" ref={this.props.navbarSubmenu}>
                {this.props.currentlyHoveredNavbarSublinkItem}
            </div>
        )
    }
};


export default NavBarSubMenu;


