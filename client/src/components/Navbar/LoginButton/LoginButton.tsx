import { Component, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { CiLogin } from 'react-icons/ci';
import { AiFillCaretDown } from 'react-icons/ai';
import UserRepository from "../../../repositories/UserRepository";

class LoginButton extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            loginButtonDetails: {
                name: "Login",
                to: "/user/login",
                sublinks: [{
                    name: "Logout",
                    onClick: () => this.logoff()
                }]
            },
        }
    }

    private logoff() {
        UserRepository.logout().then(() => {
            window.location.href = "/";
        });
    }

    getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    getLoginButtonInnerHTML(): ReactNode {
        if (this.state.username === undefined) {
            return (
                <>
                    {this.state.loginButtonDetails.name} <CiLogin />
                </>
            );
        } else {
            return (
                <>
                    Hello {this.state.username} <AiFillCaretDown />
                </>
            )
        }
    }

    loginButtonTo(): string | null {
        if (this.state.username === undefined) {
            return this.state.loginRoute;
        } else {
            return null;
        }
    }

    componentDidMount(): void {
        UserRepository.getUserName().then((response: any) => {
            this.setState({ username: response.username });
        });
    }

    render(): ReactNode {
        const loginButtonInnerHTML = this.getLoginButtonInnerHTML();
        return (
            <NavLink
                to={this.loginButtonTo()}
                onMouseOver={() => this.props.onMouseOver(this.state.loginButtonDetails.sublinks)}
                className={({ isActive }) => ["navbar-item", isActive ? "navbar-item active-link" : null].filter(Boolean).join(" ")}>
                {loginButtonInnerHTML}
                <div className="navbar-item__dropdown"></div>
            </NavLink >
        )
    };
}

export default LoginButton;
