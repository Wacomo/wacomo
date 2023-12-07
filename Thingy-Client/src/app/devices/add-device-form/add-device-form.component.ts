import { Component, EventEmitter, Output } from '@angular/core';
import { Device } from '../../models/device.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-device-form',
  templateUrl: './add-device-form.component.html',
  styleUrl: './add-device-form.component.scss'
})
export class AddDeviceFormComponent {
  @Output() close = new EventEmitter<void>();

  device: Partial<Device> = {}; // Initialize to an empty object

  constructor(private deviceDataService: DataService) {}

  onFormSubmit() {
    console.log("Submitting the following data:", this.device);
    this.deviceDataService.addDevice(this.device as Device).subscribe(newDevice => {
      console.log('New device added:', newDevice);
      this.close.emit();
    });
  }
}
