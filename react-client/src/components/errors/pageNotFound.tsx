import React from 'react';
import {Link} from 'react-router-dom';
import './Error.scss'

export default class PageNotFound extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <div className="error-page">
                <section className="hero is-xanadu-light is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Sorry
                            </h1>
                            <h2 className="subtitle">
                                This page does not yet exist
                            </h2>
                        </div>
                    </div>
                </section>
                <div className="card">
                    <div className="level" id="layered-background">
                        <Link className="button is-xanadu-dark level-item" to="/chat">Back to Safety</Link>
                    </div>
                </div>
            </div>
        );
    }
}
