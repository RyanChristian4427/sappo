import React from "react";
import {inject, observer} from "mobx-react";
import {AuthStore} from "../../stores/modules/authStore";
import {Redirect} from 'react-router-dom';

import "./Login.scss"

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

    public username: string = '';

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
                <div className="login-form">
                    <div className="field">
                        <label className="label">User Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="User Name" onChange={this.handleChange()}/>
                        </div>
                    </div>
                    <button className="button is-primary is-right" onClick={this.handleSubmitForm}>Submit</button>
                </div>
            </div>
        );
    }

    private handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.username =  event.target.value;
    };

    private handleSubmitForm = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { username } = this;
        this.injectedProps.authStore
            .login({user: {username}})
            .then(() => this.setState({redirect: true}))
    }
}
