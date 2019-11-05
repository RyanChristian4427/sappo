import React from 'react';
import {inject, observer} from 'mobx-react';

import logo from 'src/assets/logo.png';
import ChatMessage from 'src/components/ChatMessage';
import Modal from 'src/components/Modal';
import socket from 'src/models/Sockets';
import {AuthStore} from 'src/stores/modules/authStore';
import {MessageStore} from 'src/stores/modules/messageStore';

import './Home.scss';

interface InjectedProps {
    authStore: AuthStore;
    messageStore: MessageStore;
}

interface IState {
    showUserModal: boolean;
    showDataModal: boolean;
    message: string;
}

@inject('authStore', 'messageStore')
@observer
export default class Chat extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showUserModal: false,
            showDataModal: false,
            message: '',
        };
        socket.on('new_user_join', (newUser: string) => {
            console.log(newUser);
        });
    }

    public get injectedProps(): InjectedProps {
        return this.props as InjectedProps;
    }

    private createFillerData = (): React.ReactNode => {
        const messages = [];
        for (let i=0; i<4; i++) {
            messages.push(<ChatMessage key={i} abundance={5} coordinates="10, 20" datetimestamp={new Date()} message="Hello"
                                   species="Spotted Tree Frog" temperature={50} username="Ryan" />);
        }
        return messages;
    };

    render(): React.ReactNode {
        const { currentUser } = this.injectedProps.authStore;

        const currentlyLoggedInAs = (currentUser.Username !== '')
            ? <h2 className="subtitle">Currently logged in as: {currentUser.Username}</h2>
            : null;

        const modal = (this.state.showUserModal)
            ? <Modal closeModal={this.closeModal} store={this.injectedProps.authStore} />
            : (this.state.showDataModal)
                ? <Modal closeModal={this.closeModal} store={this.injectedProps.messageStore} />
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
                                    <button className="button is-charleston-green-dark" onClick={this.handleSetName}>Pick User Name</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {modal}
                <section className="chat-container is-xanadu-light">
                    <div className="messages">
                        {this.createFillerData()}
                    </div>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input className="input" type="text" placeholder="Send Text Message" onChange={this.handleChange} value={this.state.message} />
                        </div>
                        <div className="control">
                            <button className="button is-xanadu-light" id="details-button" onClick={this.handleDetailsMenu}>Add Details</button>
                        </div>
                        <div className="control">
                            <button className="button is-xanadu-light" onClick={this.handleSubmitForm}>Send</button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ message: event.target.value });
    };

    private handleSetName = (): void => {
        this.setState({ showUserModal: true });
    };

    private handleSubmitForm = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (this.injectedProps.authStore.currentUser.Username === '') {
            this.setState({ showUserModal: true });
        } else if (this.state.message !== '') {
            this.injectedProps.messageStore.sendMessage(this.state.message);
            this.setState({ message: '' });
        }
    };

    private handleDetailsMenu = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        this.setState({ showDataModal: true });
    };

    public closeModal = (): void => {
        this.setState({ showUserModal: false, showDataModal: false });
    };
}
