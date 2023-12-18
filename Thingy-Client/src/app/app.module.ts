import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataTablesModule } from 'angular-datatables';
import { NgChartsModule , NgChartsConfiguration} from 'ng2-charts';


import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {DashboardComponent} from './devices/dashboard/dashboard.component';
import {AddDeviceFormComponent} from './devices/add-device-form/add-device-form.component';
import {DeviceDetailsComponent} from './devices/device-details/device-details.component';
import {DeviceUpperComponent} from './devices/device-upper/device-upper.component';
import { ThresholdComponent } from './devices/threshold/threshold/threshold.component';
import { MetricComponent } from './metrics/metric/metric.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendInterceptor } from './interceptors/backend.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './notification/notification/notification.component';


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    RegisterComponent, 
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    AddDeviceFormComponent,
    DeviceDetailsComponent,
    DeviceUpperComponent,
    ThresholdComponent,
    MetricComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    DataTablesModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
    { provide: NgChartsConfiguration, useValue: { generateColors: false }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
