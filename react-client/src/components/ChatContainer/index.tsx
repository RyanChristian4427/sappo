import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {apiService} from 'ts-api-toolkit';

import MessageCard from 'components/MessageCard';
import {ChatMessageAfterReturn} from 'models/ChatMessage';
import {ModalType} from 'models/Modal';
import socket from 'models/Sockets';
import {AuthStoreContext, MessageStoreContext} from 'stores';

import './ChatContainer.scss';


interface IProps {
    openModal: (type: ModalType) => void;
    handleSend: () => boolean;
    submissionError: string;
}

export const ChatContainer: React.FC<IProps> = observer((props: IProps) => {
    const authStore = useContext(AuthStoreContext);
    const messageStore = useContext(MessageStoreContext);

    const [showJoinMessage, setShowJoinMessage] = useState(false);
    const [text, setText] = useState('');
    const [messages, setMessages] = useState();
    const [newestUser, setNewestUser] = useState('');

    useEffect(() => {
        apiService.get('/messages')
            .then(({ data }) => {
                data.forEach((message: ChatMessageAfterReturn) => {
                    setMessages((existingMessages: ChatMessageAfterReturn[]) => {
                        if (existingMessages) return [...existingMessages, message];
                        else return [message];
                    });
                });
            });

        socket.on('new_user_join', (newUser: string) => {
            if (newUser !== authStore.currentUser) {
                setNewestUser(newUser);
                setShowJoinMessage(true);

                setTimeout(() => {
                    setShowJoinMessage(false);
                }, 20000);
            }
        });

        socket.on('new_message', (message: ChatMessageAfterReturn) => {
            setMessages((existingMessages: ChatMessageAfterReturn[]) => {
                if (existingMessages) return [...existingMessages, message];
                else return [message];
            });
        });
    }, []);

    return (
        <section className="chat-container is-xanadu-light">
            <div className="messages">
                {messages &&
                    messages.map((message: ChatMessageAfterReturn, index: number) => {
                        return (
                            <MessageCard key={index}
                                         message={message}
                                         currentUser={authStore.currentUser}
                            />
                        );
                    })
                }
            </div>
            {showJoinMessage &&
                <h2 className="alert">{newestUser} has joined the chat</h2>
            }
            {props.submissionError &&
                <h2 className="alert error">{props.submissionError}</h2>
            }
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input className="input"
                           type="text"
                           placeholder="Send Text Message"
                           value={text}
                           onChange={(e): void => setText(e.target.value)}
                    />
                </div>
                <div className="control">
                    <button className="button is-xanadu-light"
                            id="details-button"
                            onClick={((): void => props.openModal(ModalType.additionalDetails))}>
                        Add Details
                    </button>
                </div>
                <div className="control">
                    <button className="button is-xanadu-light"
                            onClick={(): void => {
                                messageStore.setText(text);
                                if (props.handleSend()) setText('');
                            }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </section>
    );
});
