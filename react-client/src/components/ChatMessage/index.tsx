import React from 'react';
import './ChatMessage.scss';

export default class ChatMessage extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <div className="chat-message">
                <div className="container">
                    <h1>Ryan Christian</h1>
                </div>
            </div>
        )
    }
}
