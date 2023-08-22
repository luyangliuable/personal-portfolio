import { Component, createRef } from 'react';
import INavbarBurgerProps from './Interface/INavbarBurgerProps';
import INavbarBurgerState from './Interface/INavbarBurgerState';

class NavbarBurger extends Component<INavbarBurgerProps, INavbarBurgerState> {
    burgerButton = createRef<HTMLDivElement>();

    constructor(props: INavbarBurgerProps) {
        super(props);
    }

    render() {
        return (
            <div ref={this.burgerButton} className="nav-burger" onClick={this.props.onNavbarBurgerClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f2f2f2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="navbar-burger-icon" >
                    <path d="M3 12h18M3 6h18M3 18h18">
                    </path>
                </svg>
            </div>
        )
    }
}


export default NavbarBurger;
