import React from 'react';

import {ReturnedChatMessage} from 'src/models/ChatMessage';
import {displayTimeStamp} from './utility';

import './MessageCard.scss';


interface MessageProps {
    message: ReturnedChatMessage;
    currentUser: string;
}

export default class MessageCard extends React.Component<MessageProps, {}> {
    render(): React.ReactNode {
        const message = this.props.message;

        const messageRow = (label: string, data: string): React.ReactNode => {
            return (
                <div className="level">
                    <div className="level-left">
                        <h1 className="level-item is-size-5">{label}: </h1>
                    </div>
                    <div className="level-right">
                        <h2 className="level-item is-size-5">{data}</h2>
                    </div>
                </div>
            );
        };

        const abundance = (message.abundance !== 0)
            ? messageRow('Abundance', message.abundance.toString())
            : null;

        const coordinates = (!message.coordinates.every((e) => [0,0].includes(e)))
            ? messageRow('Coordinates', message.coordinates.toString())
            : null;

        const species = (message.species !== '')
            ? messageRow('Species', message.species)
            : null;

        const temperature = (message.temperature !== 0)
            ? messageRow('Current Temperature', message.temperature.toString() + '° Celsius')
            : null;

        const file = (message.file !== '')
            ? <img src={message.file}  alt={message.username + '\'s image'}/>
            : null;

        const messageContent = (): React.ReactNode => {
            return (
                <div className="container level-item">
                    <h6>{displayTimeStamp(message.datetimestamp)}</h6>
                    {messageRow(message.username, message.text)}
                    {abundance}
                    {coordinates}
                    {species}
                    {temperature}
                    {file}
                </div>
            );
        };

        // Decides what side of the screen a message should appear on. If you sent it, right side, someone else, left.
        const alignedContent = (message.username !== this.props.currentUser)
            ? <React.Fragment>
                <div className="level-left">{messageContent()}</div>
                <div className="level-right"/>
              </React.Fragment>
            : <React.Fragment>
                <div className="level-left"/>
                <div className="level-right">{messageContent()}</div>
              </React.Fragment>;

        return (
            <div className="message-card level">
                {alignedContent}
            </div>
        );
    }
}
