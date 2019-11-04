export interface Message {
    username: string;
    message: string;
    abundance?: number;
    coordinates?: string;
    species?: string;
    temperature?: number;
}
