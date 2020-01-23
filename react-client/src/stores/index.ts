import { createContext } from 'react';

import { authStore } from 'stores/authStore';
import { messageStore } from 'stores/messageStore';

export const AuthStoreContext = createContext(authStore);
export const MessageStoreContext = createContext(messageStore);
