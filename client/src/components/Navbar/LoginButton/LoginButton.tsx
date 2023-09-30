import { Component, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { CiLogin } from 'react-icons/ci';
import { AiFillCaretDown } from 'react-icons/ai';
import UserRepository from "../../../repositories/UserRepository";
import { AppContext, IAppContextProvider } from "../../../stores/AppContext";

import ILoginButtonState from "./Interface/ILoginButtonState";
import ILoginButtonProps from "./Interface/ILoginButtonProps";

class LoginButton extends Component<ILoginButtonProps, ILoginButtonState> {
    static contextType = AppContext;

    constructor(props: ILoginButtonProps, context: IAppContextProvider) {
        super(props);

        this.state = {
            loginButtonLoggedInState: {
                name: `Hello`,
                to: "/user/login",
                icon: (<AiFillCaretDown />),
                sublinks: [{
                    name: "Logout",
                    to: null,
                    onClick: () => this.logoff()
                }]
            },
            loginButtonLoggedOffState: {
                name: "Login",
                icon: (<CiLogin />),
                to: "/user/login",
                sublinks: [{
                    name: "Sign Up",
                    to: "/user/register"
                }]
            },
        }
    }

    private logoff() {
        UserRepository.logout().then(() => {
            window.location.href = "/";
        });
    }

    get loginButtonInnerHTML(): ReactNode {
        const appCtx = this.context as IAppContextProvider;
        const { userName, loginStatus } = appCtx;

        if (loginStatus) {
            return (
                <>
                    Hello {userName} {this.state.loginButtonLoggedInState.icon}
                </>
            );
        } else {
            const { name, icon } = this.state.loginButtonLoggedOffState;
            return (
                <>
                    {name} {icon}
                </>
            );
        }
    }

    get loginButtonTo(): string | null {
        const appCtx = this.context as IAppContextProvider;
        return appCtx.loginStatus ? null : this.state.loginButtonLoggedInState.to;
    }

    get sublinks(): unknown {
        const appCtx = this.context as IAppContextProvider;
        return appCtx.loginStatus ? this.state.loginButtonLoggedInState.sublinks : this.state.loginButtonLoggedOffState.sublinks;
    }

    render(): ReactNode {
        const loginButtonInnerHTML = this.loginButtonInnerHTML;
        return (
            <NavLink
                to={this.loginButtonTo}
                onMouseOver={() => this.props.onMouseOver(this.sublinks)}
                className={({ isActive }) => ["navbar-item", isActive ? "navbar-item active-link" : null].filter(Boolean).join(" ")}>
                {loginButtonInnerHTML}
                <div className="navbar-item__dropdown"></div>
            </NavLink >
        )
    };
}

export default LoginButton;
