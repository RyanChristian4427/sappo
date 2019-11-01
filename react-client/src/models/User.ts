export default class User {
    private name: string;
    private email: string;
    private token: string;

    public constructor(name: string, email: string, token: string) {
        this.name = name;
        this.email = email;
        this.token = token;
    }
}
