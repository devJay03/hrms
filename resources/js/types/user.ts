// types/user.ts
export interface User {
    id: number;
    name: string;
    email: string;
    role: number;
    created_at?: string;
    updated_at?: string;
}

export type UserPayload = {
    name: string;
    email: string;
    role: number;
    password?: string;
    confirm_password?: string;
};

// Simple response type that matches what your Laravel API returns
export interface UserResponse {
    data: User;
    message: string;
}
