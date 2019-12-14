import React from 'react';
import {Link} from 'react-router-dom';

import './Error.scss';


export const PageNotFound: React.FC = () => {
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
            <section className="card">
                <div className="level" id="layered-background">
                    <Link className="button is-xanadu-dark level-item" to="/">Back to Safety</Link>
                </div>
            </section>
        </div>
    );
};
