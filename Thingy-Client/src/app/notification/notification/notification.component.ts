import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'; // Update the path

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'] // Fix the typo in 'styleUrls'
})
export class NotificationComponent implements OnInit {
  alertData: any[] = []; // Update the type based on your data structure

  constructor(private dataService: DataService) { }

  ngOnInit(): void { 

    // Fetch initial alert data
    this.fetchAlertData();

    // Subscribe to alert updates
    this.dataService.alerts$.subscribe((newAlerts) => {
      // Update alertData when new alerts are received
      this.alertData = newAlerts;
    });

  }

  // Fetch initial alert data
  fetchAlertData(): void {
    // Implement your logic to fetch initial alert data
    this.dataService.getAlerts().subscribe((alerts) => {
      // Update alertData accordingly
      this.alertData = alerts;
    });
  }

}
