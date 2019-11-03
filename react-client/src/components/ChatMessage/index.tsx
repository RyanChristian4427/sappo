import React from 'react';
import './ChatMessage.scss';

interface MessageProps {
    abundance: number;
    coordinates: string;
    datetimestamp: Date;
    message: string;
    species: string;
    temperature: number;
    username: string;
}

export default class ChatMessage extends React.Component<MessageProps, {}> {

    // Taken from another project of mine, a webmail client, where I put quite a bit
    // of thought into how the date should be displayed. Made sense to reuse.
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
                ? this.twentyFourHourToTwelve(emailDate.getHours()) + ':' + emailDate.getMinutes()
                : months[emailDate.getMonth()] + ' ' + emailDate.getUTCDate();
    }

    // Quickly grabbed from Stack Overflow
    // Link: https://stackoverflow.com/questions/10556879/changing-the-1-24-hour-to-1-12-hour-for-the-gethours-method
    private twentyFourHourToTwelve(currentHours: number): number {
        return (currentHours + 24) % 12 || 12;
    }

    render(): React.ReactNode {
        const date: string = this.props.datetimestamp.toUTCString();
        return (
            <div className="chat-message">
                <div className="container">
                    <h6>{this.displayTimeStamp(date)}</h6>
                    <div className="level">
                        <h1 className="level-item is-size-5">{this.props.username}</h1>
                        <h2 className="level-item is-size-5">{this.props.message}</h2>
                        <h2 className="level-item is-size-5">{this.props.abundance}</h2>
                        <h2 className="level-item is-size-5">{this.props.species}</h2>
                        <h2 className="level-item is-size-5">{this.props.coordinates}</h2>
                        <h2 className="level-item is-size-5">{this.props.temperature}</h2>
                    </div>
                </div>
            </div>
        )
    }
}
