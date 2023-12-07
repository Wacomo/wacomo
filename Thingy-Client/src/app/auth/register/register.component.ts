import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  AuthService from '../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  signupForm!: UntypedFormGroup;
  submitted:any = false;
  error:any = '';
  successmsg: string | null = null;
  hidePassword: boolean = true;

  

  constructor(private formBuilder: UntypedFormBuilder,  private router: Router, private authService: AuthService) { }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.authService.register(this.signupForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.successmsg = "Registration successful!";
          console.log("registered user");
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error => {
          this.error = error; 
          console.log(this.error);// Display error
        });
    }



}
