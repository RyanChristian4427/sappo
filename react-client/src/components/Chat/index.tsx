import React from 'react';
import './Chat.scss';
import ChatMessage from 'src/components/ChatMessage';
import {inject, observer} from 'mobx-react';
import {AuthStore} from '../../stores/modules/authStore';
import logo from '../../assets/logo.jpg';
import socketIOClient from "socket.io-client";

interface InjectedProps {
    authStore: AuthStore;
}

interface IState {
    showModal: boolean;
    message: string;
    username: string;
}

enum Fields {
    username = 'username',
    message = 'message',
}

@inject('authStore')
@observer
export default class Chat extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
            message: '',
            username: '',
        };
        this.socket.on('new_user_join', (newUser: string) => {
            console.log(newUser);
        });
    }

    public get injectedProps(): InjectedProps {
        return this.props as InjectedProps;
    }

    private socket = socketIOClient.connect('');

    private createFillerData = (): React.ReactNode => {
        const list = [];

        for (let i=0; i<12; i++) {
            list.push(<ChatMessage abundance={5} coordinates="10, 20" datetimestamp={new Date()} message="Hello"
                                   species="Spotted Tree Frog" temperature={50} username="Ryan" />)
        }
        return list
    };

    public closeModal = (): void => {
        this.setState({ showModal: false });
    };

    render(): React.ReactNode {
        const usernameModal = (!this.state.showModal)
            ? null
            : <div className="modal is-active is-clipped">
                <div className="modal-background" onClick={this.closeModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Please Choose a User Name</p>
                    </header>
                    <section className="modal-card-body">
                        <input className="input" type="text" placeholder="Your User Name" onChange={this.handleChange(Fields.username)} />
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button" onClick={this.closeModal}>Cancel</button>
                        <button className="button is-success" onClick={this.setUsername}>Save changes</button>
                    </footer>
                </div>
            </div>;

        const currentlyLoggedInAs = (this.injectedProps.authStore.currentUser.Username)
            ? <h2 className="subtitle">Currently logged in as: {this.injectedProps.authStore.currentUser.Username}</h2>
            : null;

        return (
            <div className="chat-page">
                <section className="hero is-xanadu-light is-bold is-small">
                    <div className="hero-body">
                        <div className="navbar">
                            <div className="container">
                                <div className="navbar-brand">
                                    <img className="navbar-item" src={logo} alt="Sappo logo"/>
                                </div>
                                <div className="navbar-content">
                                    <h1 className="title">
                                        Sappo
                                    </h1>
                                    {currentlyLoggedInAs}
                                </div>
                                <div className="navbar-end">
                                    <button className="button is-charleston-green-dark" onClick={this.handleSubmitForm}>Pick User Name</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {usernameModal}
                <section className="chat-container is-xanadu-light">
                    <div className="messages">
                        {this.createFillerData()}
                    </div>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input className="input" type="text" placeholder="Send Text Message" onChange={this.handleChange(Fields.message)} />
                        </div>
                        <div className="control">
                            <button className="button is-xanadu-light" onClick={this.handleSubmitForm}>
                                Send
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    private setUsername = (): void => {
        this.injectedProps.authStore.setUsername(this.state.username);
        this.closeModal();
        this.socket.emit('change_username', {username: this.state.username});
    };

    private handleChange = (field: Fields) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (field === Fields.username || field === Fields.message) {
            // @ts-ignore
            // Have to ts ignore here, as it can't detect that I guarantee [field] is indeed a string type and is in `state`
            this.setState({ [field]: event.target.value });
        }
    };

    private handleSubmitForm = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (this.injectedProps.authStore.currentUser.Username === '') {
            this.setState({ showModal: true });
        }
    }
}
