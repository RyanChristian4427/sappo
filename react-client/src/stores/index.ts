import authStore from './modules/authStore';
import messageStore from './modules/messageStore';

export function createStores(): {} {
    return {
        authStore,
        messageStore,
    }
}
