import React from "react";
import {inject, observer} from "mobx-react";
import {AuthStore} from "../../stores/modules/authStore";
import {Redirect} from 'react-router-dom';

import "./Login.scss"

interface IUser {
    email: string,
    password: string,
}

enum LoginField {
    email = "email",
    password = "password",
}

interface InjectedProps {
    authStore: AuthStore
}

@inject('authStore')
@observer
export default class Login extends React.Component<{}, {}> {

    public state: any = {
        redirect: false
    };

    public get injectedProps() {
        return this.props as InjectedProps;
    }

    public user: IUser = {
        email: '',
        password: '',
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div className="Login">
                <header className="Header">
                    <h1 className="is-size-1">
                        Login Page
                    </h1>
                </header>
                <form className="login-form" onSubmit={this.handleSubmitForm}>
                    <div className="field">
                        <div className="control">
                            <input className="email-input" type="email" placeholder="Email Address" onChange={this.handleChange(LoginField.email)}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className="password-input" type="password" placeholder="Password" onChange={this.handleChange(LoginField.password)}/>
                        </div>
                    </div>
                    <button className="button is-primary is-right" value="Submit">Submit</button>
                </form>
            </div>
        );
    }

    private handleChange = (field: LoginField) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.user[field] =  event.target.value;
    };

    private handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { user } = this;
        this.injectedProps.authStore
            .login({user})
            .then(() => this.setState({redirect: true}))
    }
}
