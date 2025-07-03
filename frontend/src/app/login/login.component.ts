import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SectorService } from '../services/sector.service';
import { Sector } from '../models/sector.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  isLoginMode = true;
  availableSectors: Sector[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSectors();
  }

  loadSectors() {
    this.sectorService.sectors$.subscribe(sectors => {
      this.availableSectors = sectors;
    });
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: [''] ,
      setorId: [null]
    });
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;

    const nameControl = this.form.get('name');
    const setorControl = this.form.get('setorId');

    if (this.isLoginMode) {
      nameControl?.clearValidators();
      setorControl?.clearValidators(); 
    } else {
      nameControl?.setValidators(Validators.required);
      setorControl?.setValidators(Validators.required); 
    }
    nameControl?.updateValueAndValidity();
    setorControl?.updateValueAndValidity();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password, name, setorId } = this.form.value;

    if (this.isLoginMode) {
      this.authService.login({ email, password }).subscribe({
        next: res => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.error = 'Credenciais inválidas';
          this.loading = false;
        }
      });
    } else {
      this.authService.register({ email, password, name, setorId }).subscribe({
        next: res => {
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
