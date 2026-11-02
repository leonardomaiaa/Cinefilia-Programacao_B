export interface UserProps {
    name: string;
    email: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}

export interface UserCredentials {
    name: string;
    email: string;
    password_hash: string;
}