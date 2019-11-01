export default class User {
    private username: string;
    private token: string;

    public constructor(username: string, token: string) {
        this.username = username;
        this.token = token;
    }
}
