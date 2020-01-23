import { apiService } from 'ts-api-toolkit';
import { ChatMessageAfterReturn } from 'models/ChatMessage';

export const getMessages = (): Promise<ChatMessageAfterReturn[]> => {
    return new Promise((resolve) => {
        apiService.get('/messages').then(({ data }) => {
            resolve(data);
            // data.forEach((message: ChatMessageAfterReturn) => {
            //     setMessages((existingMessages: ChatMessageAfterReturn[]) => {
            //         if (existingMessages) return [...existingMessages, message];
            //         else return [message];
            //     });
            // });
        });
    });
};
