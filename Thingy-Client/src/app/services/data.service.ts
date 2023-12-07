import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device.model';
import { Threshold } from '../models/threshold.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Add this inside the class
  private devicesSubject = new BehaviorSubject<Device[]>([]);
  devices$ = this.devicesSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * This is the Service section to perform crud operations for the Devices
   */

    // Modify getDevice() function
    getDevices(): void {
      this.http.get<Device[]>(`device`).subscribe(devices => {
        this.devicesSubject.next(devices);
      });
    }

    // Add a refresh function
    refreshDevices(): void {
      this.getDevices();
    }
  
    addDevice(device: Device): Observable<Device> {
      return this.http.post<Device>(`device`, device);
    }
  
    updateDevice(id: number, device: Device): Observable<Device> {
      return this.http.put<Device>(`device/${id}`, device);
    }  

    // Add this function to get a single device
    getDeviceById(deviceId: string): Observable<Device> {
      return this.http.get<Device>(`device/${deviceId}`);
    }


  /**
   * This is the Service section to perform crud operations for the Threshold of a device
   */

  getThreshold(deviceId: string): Observable<Threshold | null> {
    return this.http.get<Threshold>(`threshold/${deviceId}/threshold`);
  }

  createOrUpdateThreshold(deviceId: string, threshold: Threshold): Observable<Threshold> {
    return this.http.post<Threshold>(`threshold/${deviceId}/threshold`, threshold);
  }

}
