export default class User {
    private username: string;

    public constructor(username: string) {
        this.username = username;
    }

    public get Username(): string {
        return this.username;
    }

    public set Username(newUsername: string) {
        this.username = newUsername;
    }
}
