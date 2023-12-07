import { Component } from '@angular/core';
import AuthService from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private router: Router,
  private authService: AuthService) {
}

   /**
   * Logout the user
   */
   logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
