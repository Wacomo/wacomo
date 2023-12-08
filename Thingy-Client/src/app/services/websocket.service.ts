// websocket.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private dataSubject = new Subject<any>();
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('ws://localhost:3900');

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.dataSubject.next(data);
    };
  }

  connectToDevice(deviceId: string): void {
    this.ws.send(JSON.stringify({ device_id: deviceId }));
  }

  getDataStream(): Observable<any> {
    return this.dataSubject.asObservable();
  }
}
