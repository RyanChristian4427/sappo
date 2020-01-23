// Quickly grabbed from Stack Overflow
// Link: https://stackoverflow.com/questions/10556879/changing-the-1-24-hour-to-1-12-hour-for-the-gethours-method
export function twentyFourHourToTwelve(currentHours: number): number {
    return (currentHours + 24) % 12 || 12;
}

// Taken from another project of mine, a webmail client, where I put quite a bit
// of thought into how the date should be displayed. Made sense to reuse. Probably overkill for now, but scalable.
// Link: https://github.com/RyanChristian4427/tempest/blob/master/vue-client/src/components/tempest/EmailCard.vue
export function displayTimeStamp(datetime: string): string {
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
        ? twentyFourHourToTwelve(emailDate.getHours()) +
          ':' +
          emailDate
              .getMinutes()
              .toString()
              .padStart(2, '0')
        : months[emailDate.getMonth()] + ' ' + emailDate.getUTCDate();
}
