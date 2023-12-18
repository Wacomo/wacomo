import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './devices/dashboard/dashboard.component';
import { ThresholdComponent } from './devices/threshold/threshold/threshold.component';
import { AuthGuard } from './guards/auth.guard';
import { MetricComponent } from './metrics/metric/metric.component';
import { NotificationComponent } from './notification/notification/notification.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'threshold/:id', component: ThresholdComponent, canActivate: [AuthGuard] },
    { path: 'metric/:id', component: MetricComponent, canActivate: [AuthGuard] },
    { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
