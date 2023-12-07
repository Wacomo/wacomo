import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-device-upper',
  templateUrl: './device-upper.component.html',
  styleUrl: './device-upper.component.scss'
})
export class DeviceUpperComponent {
  @Output() addDeviceClicked = new EventEmitter<void>();

  onAddDevice() {
    this.addDeviceClicked.emit();
  }
}
