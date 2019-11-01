import { observable, action } from 'mobx';
import {apiService, jwtService} from "ts-api-toolkit";
import {AuthSuccessResponse, LoginUser} from "./types";
import User from "../../../models/User";

export class AuthStore {
    @observable
    public inProgress = false;

    @observable
    public errors: string = "";

    @observable currentUser: User | undefined;

    @action async login(credentials: LoginUser) {
        this.inProgress = true;
        this.errors = "";
        return await apiService.post("users/login", credentials)
            .then(({data} : any) => this.setLoginState(data.user))
            .catch(action((err: { response: { body: { errors: any; }; }; }) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    };

    private setLoginState(user: AuthSuccessResponse) {
        this.currentUser = new User(user.username, user.token);
        jwtService.saveToken(user.token);
    }
}

export default new AuthStore();
