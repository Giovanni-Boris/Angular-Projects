import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  private ngDestroyed$ = new Subject<void>();
  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        Username: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('Password')?.value === g.get('ConfirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      let { ConfirmPassword, ...others } = this.registrationForm.value;
      this.authService
        .register(others)
        .pipe(debounceTime(300), takeUntil(this.ngDestroyed$))
        .subscribe({
          next: (val) => {
            console.log(val);
            this.router.navigate(["/auth/login"])
          },
          error: (err: HttpErrorResponse ) => {
            let error = JSON.parse(err.error)
            window.alert(error.Message)
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
