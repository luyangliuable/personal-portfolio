import { Component }  from 'react';
import { NavLink } from "react-router-dom";

import INavBurgerPanelProps from "./Interface/INavBurgerPanelProps";

class NavBurgerPanel extends Component<INavBurgerPanelProps, {}> {
    constructor(props: INavBurgerPanelProps) {
        super(props);
    }

    render() {
        return (
            <div ref={this.props.burgerPanel} className="nav-burger-panel nav-burger-panel-hide nav-burger-panel-move-lower">
                {
                    this.props.links.map(link => (
                        <NavLink
                            to={link.to}
                            className={({ isActive }) => ["burger-item", isActive ? "burger-item active-link" : null].filter(Boolean).join(" ")}
                            key={link.name}
                        >
                            {link.name}
                        </NavLink>
                    ))
                }
            </div>
        )
    }
};


export default NavBurgerPanel;


