export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user?: any;
}