import React from 'react';
import './Chat.scss';
import ChatMessage from 'src/components/ChatMessage'

export default class Chat extends React.Component<{}, {}> {

    createFillerData = (): any => {
        const list = [];

        for (let i=0; i<100; i++) {
            list.push(<ChatMessage/>)
        }
        return list
    };


    render(): React.ReactNode {
        return (
            <div className="chat-page">
                <section className="hero is-xanadu-light is-bold is-small">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Sappo
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="chat-container is-xanadu-light">
                    {this.createFillerData()}
                </div>
            </div>
        )
    }
}
