import React from 'react';
import './Chat.scss';

import ChatMessage from 'src/components/ChatMessage';
import UsernameModal from 'src/components/UserModal'
import DataModal from "../DataModal";
import {inject, observer} from 'mobx-react';
import {AuthStore} from '../../stores/modules/authStore';
import logo from '../../assets/logo.jpg';
import socket from 'src/models/Sockets';

interface InjectedProps {
    authStore: AuthStore;
}

interface IState {
    showUserModal: boolean;
    showDataModal: boolean;
    message: string;
}

@inject('authStore')
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
        const list = [];

        for (let i=0; i<4; i++) {
            list.push(<ChatMessage abundance={5} coordinates="10, 20" datetimestamp={new Date()} message="Hello"
                                   species="Spotted Tree Frog" temperature={50} username="Ryan" />)
        }
        return list
    };

    render(): React.ReactNode {
        const { currentUser } = this.injectedProps.authStore;

        const currentlyLoggedInAs = (currentUser.Username !== '')
            ? <h2 className="subtitle">Currently logged in as: {currentUser.Username}</h2>
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
                <UsernameModal authStore={this.injectedProps.authStore}  closeModal={this.closeModal}  show={this.state.showUserModal}/>
                <DataModal show={this.state.showDataModal} closeModal={this.closeModal} />
                <section className="chat-container is-xanadu-light">
                    <div className="messages">
                        {this.createFillerData()}
                    </div>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input className="input" type="text" placeholder="Send Text Message" onChange={this.handleChange} />
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
        )
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ message: event.target.value });
    };

    private handleSubmitForm = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (this.injectedProps.authStore.currentUser.Username === '') {
            this.setState({ showUserModal: true });
        }
    };

    private handleDetailsMenu = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        this.setState({ showDataModal: true });
    };

    public closeModal = (): void => {
        this.setState({ showUserModal: false });
        this.setState({ showDataModal: false });
    };
}
