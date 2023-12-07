export interface Device {
    device_id?: number; // assigned by backend
    name: string;
    location: string;
    description: string; 
    user_id?: number; //receiving this from the backend after login
    updatedAt?: string;
    createdAt?: string;
}