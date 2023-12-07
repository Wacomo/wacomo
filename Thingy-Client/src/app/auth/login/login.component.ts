import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  AuthService from '../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hidePassword: boolean = true;
  loginForm!: UntypedFormGroup;
  submitted:any = false;
  error:any = '';

  constructor(private formBuilder: UntypedFormBuilder,  private router: Router, private authService: AuthService) { }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } 

    this.authService.login(this.f['email'].value, this.f['password'].value)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['/dashboard']);
            },
            error => {
              this.error = error; 
              console.log(this.error);
            });
  }
}
