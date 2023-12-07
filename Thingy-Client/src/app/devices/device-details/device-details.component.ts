import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.scss'
})
export class DeviceDetailsComponent {

  @Input() selectedDevice: any; // Input to receive selected user
  updateSuccess: boolean = false;


  constructor(private deviceDataService: DataService) { }

  unselectDevice(): void {
    this.selectedDevice = null;

  }

  updateDevice(): void {
    if (this.selectedDevice) {
      console.log(this.selectedDevice);
      this.deviceDataService.updateDevice(this.selectedDevice.device_id, this.selectedDevice).subscribe(
        updatedUser => {
          console.log("Device updated:", updatedUser);
          this.updateSuccess = true;
          setTimeout(() => this.updateSuccess = false, 3000); // hides the message after 3 seconds
          this.deviceDataService.refreshDevices(); // Refresh the list
        },
        error => {
          console.log("Error updating device:", error);
        }
      );
    }
  }

}
