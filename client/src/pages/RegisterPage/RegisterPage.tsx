import React, { Component, createRef } from 'react';
import "./RegisterPage.css";
import PostRepository from "../../repositories/UserRepository";

class RegisterPage extends Component<any, any> {
    userNameRef: React.RefObject<HTMLInputElement>
    emailRef: React.RefObject<HTMLInputElement>
    firstnameRef: React.RefObject<HTMLInputElement>
    lastnameRef: React.RefObject<HTMLInputElement>
    passwordRef: React.RefObject<HTMLInputElement>
    confirmPasswordRef: React.RefObject<HTMLInputElement>
    flash: React.RefObject<HTMLInputElement>

    constructor(props: any) {
        super(props);
        this.userNameRef = createRef();
        this.firstnameRef = createRef();
        this.lastnameRef = createRef();
        this.emailRef = createRef();
        this.passwordRef = createRef();
        this.confirmPasswordRef = createRef();
        this.flash = createRef();

        this.state = {
            registerStatus: "Pending",
            flashMessage: ""
        };
    }

    private getFlashClassNames(): string {
        let className = "register-form--register-flash"; // common class

        switch (this.state.registerStatus) {
            case "Success":
                className = `flash-green ${className}`;
                break;
            case "Failed":
                className = `flash-red ${className}`;
                break;
        }

        return className;
    }

    private updateRegisterFlash(registerStatus: string, flashMessage: string) {
        this.setState({
            registerStatus: registerStatus,
            flashMessage: flashMessage
        });
    }

    private handleRegisterSuccess(data: any): void {
        this.updateRegisterFlash("Success", "Register Successful!");
        window.location.href = "/";
    }

    private handleRegisterFailure(err: any): void {
        this.updateRegisterFlash("Failed", "Invalid User name or password.");
    }

    private register(e: any): void {
        e.preventDefault();

        const registerDetails = {
            "email": this.userNameRef.current!.value,
            "password": this.passwordRef.current!.value,
            "username": this.userNameRef.current!.value,
            "first_name": this.firstnameRef.current!.value,
            "last_name": this.lastnameRef.current!.value,
        };

        PostRepository.register(registerDetails)
            .then((data) => this.handleRegisterSuccess(data))
            .catch((err) => this.handleRegisterFailure(err));
    }

    render(): React.ReactElement<any, any> {
        return (
            <main>
                <form className="register-form__wrapper position-relative flex flex-col justify-center items-center w-full" >
                    <h1>Sign up to ~/llcode.tech</h1>
                    <div className="register-form">
                        {
                            this.state.registerStatus !== "Pending" && (
                                <div className={this.getFlashClassNames()}>{this.state.flashMessage}</div>
                            )
                        }
                        <input ref={this.userNameRef} type="text" placeholder="🙋‍♂️🙋‍♀️ username" />
                        <input ref={this.emailRef} type="text" placeholder="📧✉️ email" />
                        <input ref={this.firstnameRef} type="text" placeholder="🌟 firstname" />
                        <input ref={this.lastnameRef} type="text" placeholder="🌟 lastname" />
                        <input ref={this.passwordRef} type="password" placeholder="🔒🔑️ password" />
                        <input ref={this.confirmPasswordRef} type="password" placeholder="🔒🔑️ confirm password" />
                        <input type="submit" className="button" onClick={(e) => this.register(e)} />
                    </div>
                </form>
            </main>
        )
    }
}

export default RegisterPage;
