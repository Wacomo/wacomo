export interface Threshold {
    threshold_id?: number;
    temp_max: number;
    temp_min: number;
    humidity_max: number;
    humidity_min: number;
    co2_max: number;
    co2_min: number;
    device_id?: number;
    createdAt?: string;
    updatedAt?: string;
}