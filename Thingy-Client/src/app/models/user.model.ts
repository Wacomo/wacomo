export interface User {
    userId?: number; // assigned by backend
    username: string;
    email: string;
    password?: string; 
    token?: string; //receiving this from the backend after login
}
