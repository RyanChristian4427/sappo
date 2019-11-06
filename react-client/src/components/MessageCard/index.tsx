import React from 'react';

import './MessageCard.scss';

interface MessageProps {
    abundance: number;
    coordinates: [number, number];
    datetimestamp: Date;
    message: string;
    species: string;
    temperature: number;
    username: string;
    currentUser: string;
}

export default class MessageCard extends React.Component<MessageProps, {}> {

    // Taken from another project of mine, a webmail client, where I put quite a bit
    // of thought into how the date should be displayed. Made sense to reuse. Probably overkill for now, but scalable.
    // Link: https://github.com/RyanChristian4427/tempest/blob/master/vue-client/src/components/tempest/EmailCard.vue
    private displayTimeStamp(datetime: string): string {
        const emailDate = new Date(datetime);

        const today = new Date();

        const dayInMillis = 60 * 60 * 24 * 1000;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // If an email is more than 6 months old (irrespective of date within month), and is the year previous,
        // give it the full date format. If it was in the past 24 hours, give it a timestamp, otherwise,
        // give it mmm / dd format
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6, 0);
        return sixMonthsAgo > emailDate && today.getFullYear() !== emailDate.getFullYear()
            ? months[emailDate.getMonth()] + ' ' + emailDate.getUTCDate() + ' ' + emailDate.getFullYear()
            : today.getTime() - emailDate.getTime() < dayInMillis
                ? this.twentyFourHourToTwelve(emailDate.getHours()) + ':' + (emailDate.getMinutes()).toString().padStart(2, '0')
                : months[emailDate.getMonth()] + ' ' + emailDate.getUTCDate();
    }

    // Quickly grabbed from Stack Overflow
    // Link: https://stackoverflow.com/questions/10556879/changing-the-1-24-hour-to-1-12-hour-for-the-gethours-method
    private twentyFourHourToTwelve(currentHours: number): number {
        return (currentHours + 24) % 12 || 12;
    }

    render(): React.ReactNode {
        const date: string = this.props.datetimestamp.toUTCString();

        const messageContent = (): React.ReactNode => {
            return (
                <div className="container level-item">
                    <h6>{this.displayTimeStamp(date)}</h6>
                    <div className="level">
                        <div className="level-right">
                            <h1 className="level-item is-size-5">{this.props.username}: </h1>
                        </div>
                        <h2 className="level-item is-size-5">{this.props.message}</h2>
                    </div>
                </div>
            );
        };

        const alignedContent = (this.props.username !== this.props.currentUser)
            // TODO It might be my inexperience with the framework, but it seems that without the opposite level item, there is no effect,
            // i.e., all items end up on the left. To fix this, I've just inserted empty elements to make the spacing work. Come back to this later?
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
