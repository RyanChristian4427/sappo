import React from 'react';

export default class PageNotFound extends React.Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <div className="Error">
                <header className="Header">
                    <h1 className="is-size-1">
                        Page Not Found
                    </h1>
                </header>
            </div>
        );
    }
}
