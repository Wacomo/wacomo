import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device.model';

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

  /**
   * This is the Service section to perform crud operations for the Threshold of a device
   */

}
