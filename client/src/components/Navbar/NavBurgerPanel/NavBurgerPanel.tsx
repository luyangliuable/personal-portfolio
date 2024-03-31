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
                        className={({ isActive }) => {
                            let classes = ["burger-item", "flex", "justify-center", "items-center"];
                            if (isActive && link.to) {
                                const currentSearchParams = new URLSearchParams(window.location.search);
                                const targetSearchParams = new URLSearchParams(new URL(link.to, window.location.href).search);
                                const isQueryParamSame = [...targetSearchParams].every(([key, value]) => currentSearchParams.get(key) === value);
                                if (isQueryParamSame) classes.push("active-link");
                            }
                            return classes.filter(Boolean).join(" ");
                        }}
                        key={link.name}
                    >
                        {link.name}
                    </NavLink>
                ))
            }
        </div>
    )
};


export default React.memo(NavBurgerPanel);
