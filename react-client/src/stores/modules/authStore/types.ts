export interface AuthSuccessResponse {
    first_name: string,
    last_name: string,
    email: string,
    token: string,
}

export interface LoginUser {
    user: {
        email: string,
        password: string,
    }
}
