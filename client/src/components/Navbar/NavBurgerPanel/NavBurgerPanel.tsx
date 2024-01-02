import React from 'react';
import { NavLink } from "react-router-dom";
import INavBurgerPanelProps from "./Interface/INavBurgerPanelProps";
import "./NavBurgerPanel.css";

const NavBurgerPanel: React.FC<INavBurgerPanelProps> = ({ burgerPanel, links }) => {
    return (
        <div ref={burgerPanel} className="nav-burger-panel nav-burger-panel-hide nav-burger-panel-move-lower">
            {
                links.map(link => (
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
};


export default NavBurgerPanel;


