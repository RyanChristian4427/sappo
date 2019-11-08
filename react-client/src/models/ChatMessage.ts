interface BaseChatMessage {
    username: string;
    text: string;
    datetimestamp: Date | string;
    abundance: number;
    coordinates: [number, number];
    species: string;
    temperature: number;
    file: string;
}

interface ChatMessageBeforeSend extends BaseChatMessage {
    datetimestamp: Date;
}

export const BaseChatMessage: ChatMessageBeforeSend = {
    username: '',
    text: '',
    datetimestamp: new Date(0),
    abundance: 0,
    coordinates: [0, 0],
    species: '',
    temperature: 0,
    file: '',
};

// Json encoding changes Date object into string
export interface ChatMessageAfterReturn extends BaseChatMessage {
    datetimestamp: string;
}
