import React, { Component, createRef } from 'react';
import "./LogInPage.css";
import PostRepository from "../../repositories/UserRepository";

class LogInPage extends Component<any, any> {
    userNameRef: React.RefObject<HTMLInputElement>
    passwordRef: React.RefObject<HTMLInputElement>
    flash: React.RefObject<HTMLInputElement>

    constructor(props: any) {
        super(props);
        this.userNameRef = createRef();
        this.passwordRef = createRef();
        this.flash = createRef();

        this.state = {
            loginStatus: "Pending",
            flashMessage: ""
        };
    }

    private getFlashClassNames(): string {
        let className = "login-form--login-flash"; // common class

        switch (this.state.loginStatus) {
            case "Success":
                className = `flash-green ${className}`;
                break;
            case "Failed":
                className = `flash-red ${className}`;
                break;
        }

        return className;
    }

    private updateLoginFlash(loginStatus: string, flashMessage: string) {
        this.setState({
            loginStatus: loginStatus,
            flashMessage: flashMessage
        });
    }

    private handleLoginSuccess(data: any): void {
        document.cookie = `user_id=${data.user_id}; path=/`;
        document.cookie = `session_token=${data.session_token}; path=/`;

        this.updateLoginFlash("Success", "Login Successful!");
    }

    private handleLoginFailure(err: any): void {
        this.updateLoginFlash("Failed", "Invalid User name or password.");
    }

    private login(e: any): void {
        e.preventDefault();

        const loginDetails = {
            "email": this.userNameRef.current!.value,
            "password": this.passwordRef.current!.value
        };

        PostRepository.login(loginDetails)
            .then((data) => this.handleLoginSuccess(data))
            .catch((err) => this.handleLoginFailure(err));
    }

    render(): React.ReactElement<any, any> {
        return (
            <form className="login-form__wrapper" >
                <h1>Sign in to ~/llcode.tech</h1>
                <div className="login-form">
                    {
                        this.state.loginStatus !== "Pending" && (
                            <div className={this.getFlashClassNames()}>{this.state.flashMessage}</div>
                        )
                    }
                    <input ref={this.userNameRef} type="text" placeholder="🙋‍♂️🙋‍♀️ username" />
                    <p>Forgot Password?</p>
                    <input ref={this.passwordRef} type="password" placeholder="🔒🔑️ password" />
                    <input type="submit" className="button" onClick={(e) => this.login(e)} />
                </div>
            </form>
        )
    }
}

export default LogInPage;
