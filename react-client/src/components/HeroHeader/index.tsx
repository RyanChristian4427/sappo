import React from 'react';

import logo from 'assets/logo.png';
import {ModalType} from 'models/Modal';

import './HeroHeader.scss';


interface IProps {
    currentUser: string;
    handleModal: (type: ModalType) => void;
}

export default class HeroHeader extends React.Component<IProps, {}> {
    render(): React.ReactNode {
        const currentUser = this.props.currentUser;

        const currentlyLoggedInAs = (currentUser !== '')
            ? <h2 className="subtitle">Currently logged in as: {currentUser}</h2>
            : null;

        return (
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
                                <button className="button is-charleston-green-dark" onClick={((): void => this.props.handleModal(ModalType.selectUsername))}>Pick User Name</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
