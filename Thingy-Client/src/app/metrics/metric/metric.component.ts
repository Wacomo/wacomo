import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { ChartType } from 'chart.js';
import { Threshold } from '../../models/threshold.model';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrl: './metric.component.scss'
})
export class MetricComponent {

  deviceId: string | null = null;
  device: Device | null = null; 
  threshold: Threshold | null = null;


  public tempChartData: ChartConfiguration<'line'>['data']= {
    labels: [],
    datasets: []
  };
  public tempChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };


  public humidityChartData: ChartConfiguration<'line'>['data']= {
    labels: [],
    datasets: []
  };
  public humidityChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };


  public co2ChartData: ChartConfiguration<'line'>['data']= {
    labels: [],
    datasets: []
  };
  public co2ChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService

  ) {}

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    console.log(this.deviceId);

    if (this.deviceId) {
      this.dataService.getDeviceById(this.deviceId).subscribe(device => {
        this.device = device;
      });
      this.dataService.getThreshold(this.deviceId).subscribe(threshold => {
        this.threshold = threshold;
        this.prepareChartData();
      });
    }
  }

  private prepareChartData(): void {
    if (this.threshold) {
      this.tempChartData = {
        labels: ['Minimun', 'Maximum'], // Assuming you want to label the points as Min and Max
        datasets: [
          {
            data: [this.threshold.temp_min, this.threshold.temp_min], // Min line
            label: 'Minimum Temperature',
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.3)',
            fill: false
          },
          {
            data: [this.threshold.temp_max, this.threshold.temp_max], // Max line
            label: 'Minimum Temperature',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            fill: false
          }
        ]
      };

      this.humidityChartData = {
        labels: ['Minimum', 'Maximum'],
        datasets: [
          {
            data: [this.threshold.humidity_min, this.threshold.humidity_min],
            label: 'Minimum Humidity',
            fill: false,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.3)'
          },
          {
            data: [this.threshold.humidity_max, this.threshold.humidity_max],
            label: 'Maximum Humidity',
            fill: false,
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.3)'
          }

        ]
      
      };

      this.co2ChartData = {
        labels: ['Minimum', 'Maximum'],
        datasets: [
          {
            data: [this.threshold.co2_min, this.threshold.co2_min],
            label: 'Minimum CO2',
            fill: false,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.3)'
          },
          {
            data: [this.threshold.co2_min, this.threshold.co2_min],
            label: 'Maximum CO2',
            fill: false,
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.3)'
          }
        ]
      };
    }
  }

  
}
