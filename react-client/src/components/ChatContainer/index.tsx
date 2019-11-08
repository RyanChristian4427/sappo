import React from 'react';
import {inject, observer} from 'mobx-react';
import {apiService} from 'ts-api-toolkit';

import MessageCard from 'components/MessageCard';
import {ChatMessageAfterReturn} from 'models/ChatMessage';
import {ModalType} from 'models/Modal';
import socket from 'models/Sockets';
import {AuthStore} from 'stores/modules/authStore';
import {MessageStore} from 'stores/modules/messageStore';

import './ChatContainer.scss';


interface IProps {
    handleModal: (type: ModalType) => void;
    handleSend: () => boolean;
}

// Doing this is not recommended by any means, however, Typescript just fundamentally does not work with
// mobx's idea of injection. Doing this is the workaround, and better solution than suppressing typescripts warnings
// that a store type does not exist on the props.
interface InjectedProps extends IProps {
    authStore: AuthStore;
    messageStore: MessageStore;
}

interface IState {
    showJoinMessage: boolean;
    text: string;
    messages: Array<ChatMessageAfterReturn>;
    newestUser: string;
}

@inject('authStore', 'messageStore')
@observer
export default class ChatContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showJoinMessage: false,
            text: '',
            messages: [],
            newestUser: '',
        };
        socket.on('new_user_join', (newUser: string) => {
            if (newUser !== this.injectedProps.authStore.currentUser) {
                this.setState({
                    newestUser: newUser,
                    showJoinMessage: true
                });

                setTimeout(() => {
                    this.setState({
                        showJoinMessage: false
                    });
                }, 20000);
            }
        });

        // Appends any new messages to the end of a message array
        socket.on('new_message', (message: ChatMessageAfterReturn) => {
            this.setState({messages: [...this.state.messages, message ]});
        });
    }

    public componentDidMount(): void {
        apiService.get('/messages')
            .then(({ data }) => {
                data.forEach((message: ChatMessageAfterReturn) => {
                    this.setState({messages: [...this.state.messages, message]});
                });
            });
    }

    private get injectedProps(): InjectedProps {
        return this.props as InjectedProps;
    }

    public render(): React.ReactNode {
        const { currentUser } = this.injectedProps.authStore;

        const messages = (this.state.messages.map((message) => {
            return (
                <MessageCard key={message.username + message.text} message={message} currentUser={currentUser} />
            );
        }));

        const joinMessage = (this.state.showJoinMessage)
            ? <h2 className="join-message">{this.state.newestUser} has joined the chat</h2>
            : null;

        return (
            <section className="chat-container is-xanadu-light">
                <div className="messages">
                    {messages}
                </div>
                {joinMessage}
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input className="input" type="text" placeholder="Send Text Message" onChange={this.handleChange} value={this.state.text} />
                    </div>
                    <div className="control">
                        <button className="button is-xanadu-light" id="details-button" onClick={((): void => this.props.handleModal(ModalType.additionalDetails))}>Add Details</button>
                    </div>
                    <div className="control">
                        <button className="button is-xanadu-light" onClick={this.handleSend}>Send</button>
                    </div>
                </div>
            </section>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ text: event.target.value });
    };

    private handleSend = (): void => {
        this.injectedProps.messageStore.setText(this.state.text);
        if (this.props.handleSend()) {
            this.setState({ text: '' });
        }
    };
}
