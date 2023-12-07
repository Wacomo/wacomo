import { Component, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { Device } from '../../models/device.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit,OnDestroy{
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  @ViewChild('deviceDetailsSection')
  deviceDetailsSection!: ElementRef;

  devices: Device[] = [];
  filteredDevices: Device[] = [];
  selectedDevice: any = null; // To store the selected user's details
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  showModal: boolean = false;

  userTypeFilter: string = '';
  cantonFilter: string = '';

  roleFilter: string = '';
  searchTerm: string = '';

  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private deviceDataService: DataService,private renderer: Renderer2) {}
 
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'simple_numbers',
      paging: true
    };

    this.dtoptions = {
      pagingType: 'simple_numbers',
      paging: true
    };
  
    this.deviceDataService.devices$.subscribe((data: Device[]) => {
      this.devices = data;
      this.rerender();
    });
    
    this.deviceDataService.getDevices(); // Initial fetch
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe
    this.dtTrigger.unsubscribe();
  }

  fetchDevices(): void {
    this.deviceDataService.refreshDevices();
  }


  selectDevice(device: Device): void {
    //Update the selected user
    this.selectedDevice = device;

    // Scroll to the user details section.
    if (this.deviceDetailsSection) {
      this.deviceDetailsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.fetchDevices(); // Refresh the data
  }

  rerender(): void {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next(undefined);
      });
    } else {
      this.dtTrigger.next(undefined);
    }
  }
}
