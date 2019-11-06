import React from 'react';
import {inject, observer} from 'mobx-react';

import logo from 'src/assets/logo.png';
import MessageCard from 'src/components/MessageCard';
import Modal from 'src/components/Modal';
import {ChatMessage} from '../../models/ChatMessage';
import socket from 'src/models/Sockets';
import User from 'src/models/User';
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
    newMessage: string;
    messages: Array<ChatMessage>;
}

@inject('authStore', 'messageStore')
@observer
export default class Chat extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showUserModal: false,
            showDataModal: false,
            newMessage: '',
            messages: [],
        };
        socket.on('new_user_join', (newUser: User) => {
            console.log(newUser.Username + ' has joined the chat');
        });
        socket.on('new_message', (message: ChatMessage) => {
            this.setState({messages: [...this.state.messages, message ]});
        });
    }

    public get injectedProps(): InjectedProps {
        return this.props as InjectedProps;
    }

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

        const messages = (this.state.messages.map((message) => {
            return (
                <MessageCard key={message.username + message.message} abundance={message.abundance} coordinates={message.coordinates}
                             datetimestamp={new Date()} message={message.message}
                             species={message.species} temperature={message.temperature}
                             username={message.username} />
            );
        }));

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
                       {messages}
                    </div>
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input className="input" type="text" placeholder="Send Text Message" onChange={this.handleChange} value={this.state.newMessage} />
                        </div>
                        <div className="control">
                            <button className="button is-xanadu-light" id="details-button" onClick={this.handleDetailsMenu}>Add Details</button>
                        </div>
                        <div className="control">
                            <button className="button is-xanadu-light" onClick={this.handleSubmitMessage}>Send</button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ newMessage: event.target.value });
    };

    private handleSetName = (): void => {
        this.setState({ showUserModal: true });
    };

    private handleSubmitMessage = (e: React.FormEvent<HTMLButtonElement>): void => {
        if (this.injectedProps.authStore.currentUser.Username === '') {
            this.setState({ showUserModal: true });
        } else if (this.state.newMessage !== '') {
            this.injectedProps.messageStore.sendMessage(this.state.newMessage);
            this.setState({ newMessage: '' });
        }
    };

    private handleDetailsMenu = (): void => {
        this.setState({ showDataModal: true });
    };

    public closeModal = (): void => {
        this.setState({ showUserModal: false, showDataModal: false });
    };
}
