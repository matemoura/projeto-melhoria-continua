import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: [''] // usado no modo de cadastro
    });
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;

    const nameControl = this.form.get('name');
    if (this.isLoginMode) {
      nameControl?.clearValidators();
    } else {
      nameControl?.setValidators(Validators.required);
    }
    nameControl?.updateValueAndValidity();
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const { email, password, name } = this.form.value;

    if (this.isLoginMode) {
      this.authService.login({ email, password }).subscribe({
        next: res => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/']);
        },
        error: () => {
          this.error = 'Credenciais inválidas';
          this.loading = false;
        }
      });
    } else {
      this.authService.register({ email, password, name }).subscribe({
        next: res => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/']);
        },
        error: () => {
          this.error = 'Erro ao cadastrar. Tente novamente.';
          this.loading = false;
        }
      });
    }
  }
}
