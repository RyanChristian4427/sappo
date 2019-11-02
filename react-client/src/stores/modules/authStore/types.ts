export interface AuthSuccessResponse {
    username: string;
    token: string;
}

export interface LoginUser {
    user: {
        username: string;
    };
}
