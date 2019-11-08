import mongoose from 'mongoose';

export interface ChatMessage {
    username: string;
    text: string;
    datetimestamp: string;
    abundance: number;
    coordinates: [number, number];
    species: string;
    temperature: number;
    file: string;
}

export type MessageDocument = mongoose.Document & {
    username: string;
    text: string;
    datetimestamp: string;
    abundance: number;
    coordinates: [number, number];
    species: string;
    temperature: number;
    file: string;
};


const messageSchema = new mongoose.Schema({
    username: String,
    text: String,
    datetimestamp: String,
    abundance: Number,
    coordinates: [Number, Number],
    species: String,
    temperature: Number,
    file: String,
});

export const Message = mongoose.model<MessageDocument>('Message', messageSchema);
