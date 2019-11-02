import React from 'react';
import {inject, observer} from 'mobx-react';
import {AuthStore} from '../../stores/modules/authStore';
import {Redirect} from 'react-router-dom';

import './Login.scss'

interface InjectedProps {
    authStore: AuthStore;
}

@inject('authStore')
@observer
export default class Login extends React.Component<{}, {}> {

    public state = {
        redirect: false
    };

    public get injectedProps(): InjectedProps {
        return this.props as InjectedProps;
    }

    public username = '';

    render(): React.ReactNode {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                <section className="hero is-xanadu-light">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Login
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="card">
                    <div className="container" id="layered-background">
                        <div className="field">
                            <label className="label">User Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="User Name" onChange={this.handleChange()}/>
                            </div>
                        </div>
                        <button className="button is-xanadu-dark is-right" onClick={this.handleSubmitForm}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }

    private handleChange = () => (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.username =  event.target.value;
    };

    private handleSubmitForm = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const { username } = this;
        this.injectedProps.authStore
            .login({user: {username}})
            .then(() => this.setState({redirect: true}))
    }
}
