import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { ChartType } from 'chart.js';
import { Threshold } from '../../models/threshold.model';
import { WebSocketService } from '../../services/websocket.service';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrl: './metric.component.scss'
})
export class MetricComponent {

  deviceId: string | null = null;
  device: Device | null = null;
  threshold: Threshold | null = null;
  private alertSubject = new Subject<any>();


  public tempChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public tempChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };


  public humidityChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public humidityChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };


  public co2ChartData: ChartConfiguration<'line'>['data'] = {
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

  ) { 

    // Debounce alert sending
    this.alertSubject.pipe(
      debounce(() => timer(15000)) 
    ).subscribe(alertData => {
      this.dataService.sendAlert(alertData).subscribe({
        next: response => console.log('Alert sent:', response),
        error: error => console.error('Error sending alert:', error)
      });
    });
  }

  ngOnInit(): void {
    // Retrieve the device ID from the route and fetch device and threshold details
    this.deviceId = this.route.snapshot.paramMap.get('id');

    if (this.deviceId) {
      this.dataService.getDeviceById(this.deviceId).subscribe(device => {
        this.device = device;
        this.websocketService.connectToDevice(this.device?.name);
      });

      this.dataService.getThreshold(this.deviceId).subscribe(threshold => {
        this.threshold = threshold;
        this.initializeChartData();
      });

      // Subscribe to WebSocket data stream
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
    // Create chart data with minimum and maximum values
    return {
      labels: ['Minimum', 'Maximum'],
      datasets: [
        // Dataset for minimum value
        {
          data: [minValue, minValue],
          label: 'Minimum',
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.3)',
          fill: false
        },
        // Dataset for maximum value
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

    // Check if the incoming data exceeds the threshold and update the chart
    let thresholdViolated = false;
    let anomalyValue = 0;
    let metricData = '';

    // Update chart data based on the metric type (TEMP, HUMID, CO2_EQUIV)
    // and check for threshold violation
    if (data.appId === 'TEMP') {
      anomalyValue = parseFloat(data.data);
      metricData = 'Temperature';
      if (this.threshold) {
        if (anomalyValue < this.threshold.temp_min || anomalyValue > this.threshold.temp_max) {
          thresholdViolated = true;
        }
      }

      this.tempChartData = { ...this.tempChartData, datasets: this.updateChart(this.tempChartData.datasets, anomalyValue) };
    } else if (data.appId === 'HUMID') {
      anomalyValue = parseFloat(data.data);
      metricData = 'Humidity';
      if (this.threshold) {
        if (anomalyValue < this.threshold.humidity_min || anomalyValue > this.threshold.humidity_max) {
          thresholdViolated = true;
        }
      }

      this.humidityChartData = { ...this.humidityChartData, datasets: this.updateChart(this.humidityChartData.datasets, anomalyValue) };

    } else if (data.appId === 'CO2_EQUIV') {
      anomalyValue = parseFloat(data.data);
      metricData = 'Co2 Level';
      if (this.threshold) {
        if (anomalyValue < this.threshold.co2_min || anomalyValue > this.threshold.co2_max) {
          thresholdViolated = true;
        }
      }

      this.co2ChartData = { ...this.co2ChartData, datasets: this.updateChart(this.co2ChartData.datasets, anomalyValue) };
    }

    if (thresholdViolated) {
      this.sendAlert(this.device?.name, metricData, anomalyValue);
    }
  }

  private sendAlert(deviceName: string | undefined, metricData: string, anomalyValue: number): void {
    const alertData = {
      device_name: deviceName,
      metric_data: metricData,
      time_of_anomaly: new Date().toISOString(),
      anomaly_value: anomalyValue
    };

    // Emit the alert data to be debounced
    this.alertSubject.next(alertData);
  }

  private updateChart(datasets: ChartConfiguration<'line'>['data']['datasets'], currentValue: number): ChartConfiguration<'line'>['data']['datasets'] {
    // Update the chart with the current value
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
