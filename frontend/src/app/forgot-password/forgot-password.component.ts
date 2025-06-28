import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  form: FormGroup;
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  submitted: boolean = false; 

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.submitted = false;

    const email = this.form.value.email;
    this.authService.forgotPassword(email).subscribe({
      next: (res) => {
        this.message = res.message;
        this.isError = false;
        this.isLoading = false;
        this.submitted = true; 
      },
      error: () => {
        this.message = 'Ocorreu um erro. Tente novamente mais tarde.';
        this.isError = true;
        this.isLoading = false;
        this.submitted = true;
      }
    });
  }
}