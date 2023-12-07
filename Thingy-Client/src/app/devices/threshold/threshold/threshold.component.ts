import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service'; 
import { Device } from '../../../models/device.model';
import { Threshold } from '../../../models/threshold.model';

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.scss']
})
export class ThresholdComponent implements OnInit {
  deviceId: string | null = null;
  device: Device | null = null; 
  threshold: Threshold | null = null;
  updateSuccess: boolean = false;
  showForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef

  ) {}

  toggleForm(): void {
    if (!this.threshold) {
      this.threshold = {
        temp_min: 0,
        temp_max: 0,
        humidity_min: 0,
        humidity_max: 0,
        co2_min: 0,
        co2_max: 0
      };
    }
    this.showForm = !this.showForm;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    console.log(this.deviceId);

    if (this.deviceId) {
      this.dataService.getDeviceById(this.deviceId).subscribe(device => {
        this.device = device;
      });

      this.dataService.getThreshold(this.deviceId).subscribe({
        next: (data) => {
          this.threshold = data;
          this.showForm = true; // Automatically show the form if threshold data is found
        },
        error: (error) => {
          this.threshold = null;
          this.showForm = false; // Keep the form hidden if no threshold data is found
        }
      });
    }
  }

  updateThreshold(): void {
    if (this.deviceId && this.threshold) {
      this.dataService.createOrUpdateThreshold(this.deviceId, this.threshold).subscribe({
        next: (data) => {
          this.updateSuccess = true;
          setTimeout(() => this.updateSuccess = false, 3000);
          this.threshold = data;
        },
        error: (error) => {
          // Handle errors here
          this.updateSuccess = false;
          console.log("Error updating threshold:", error);
        }
      });
    }
  }

  updateField(field: keyof Threshold, value: string): void {
    if (this.threshold) {
      (this.threshold as any)[field] = parseFloat(value);
    }
  }
  
}
