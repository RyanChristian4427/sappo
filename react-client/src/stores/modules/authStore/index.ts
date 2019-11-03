import { observable, action } from 'mobx';
import User from '../../../models/User';

export class AuthStore {
    @observable currentUser = new User('');

    @action setUsername(username: string): void {
        this.currentUser = new User(username);
    }
}

export default new AuthStore();
