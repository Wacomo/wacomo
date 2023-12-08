import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { ChartType } from 'chart.js';
import { Threshold } from '../../models/threshold.model';
import { WebSocketService } from '../../services/websocket.service';

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
    private dataService: DataService,
    private websocketService: WebSocketService

  ) {}

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id');

    if (this.deviceId) {
      this.dataService.getDeviceById(this.deviceId).subscribe(device => {
        this.device = device;
        // Assuming the device name is used as the device_id in WebSocket communication
        this.websocketService.connectToDevice(this.device?.name);
      });

      this.dataService.getThreshold(this.deviceId).subscribe(threshold => {
        this.threshold = threshold;
        this.initializeChartData();
      });

      this.websocketService.getDataStream().subscribe(data => {
        this.updateChartData(data);
      });
    }
  }

  private initializeChartData(): void {
    // Initialize chart data with threshold values
    if (this.threshold) {
      this.tempChartData = this.createChartData(this.threshold.temp_min, this.threshold.temp_max);
      this.humidityChartData = this.createChartData(this.threshold.humidity_min, this.threshold.humidity_max);
      this.co2ChartData = this.createChartData(this.threshold.co2_min, this.threshold.co2_max);
    }
  }

  private createChartData(minValue: number, maxValue: number): ChartConfiguration<'line'>['data'] {
    return {
      labels: ['Minimum', 'Maximum'],
      datasets: [
        {
          data: [minValue, minValue],
          label: 'Minimum',
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.3)',
          fill: false
        },
        {
          data: [maxValue, maxValue],
          label: 'Maximum',
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          fill: false
        }
      ]
    };
  }

  private updateChartData(data: any): void {
    if (data.appId === 'TEMP') {
      this.tempChartData = { ...this.tempChartData, datasets: this.updateChart(this.tempChartData.datasets, parseFloat(data.data)) };
    } else if (data.appId === 'HUMID') {
      this.humidityChartData = { ...this.humidityChartData, datasets: this.updateChart(this.humidityChartData.datasets, parseFloat(data.data)) };
    } else if (data.appId === 'CO2_EQUIV') {
      this.co2ChartData = { ...this.co2ChartData, datasets: this.updateChart(this.co2ChartData.datasets, parseFloat(data.data)) };
    }
  }
  
  private updateChart(datasets: ChartConfiguration<'line'>['data']['datasets'], currentValue: number): ChartConfiguration<'line'>['data']['datasets'] {
    let newDatasets = [...datasets];
  
    if (newDatasets.length === 3) {
      newDatasets[2] = { ...newDatasets[2], data: [currentValue, currentValue] };
    } else {
      newDatasets.push({
        data: [currentValue, currentValue],
        label: 'Current',
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        fill: false
      });
    }
  
    return newDatasets;
  }

  
}
