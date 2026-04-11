import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from 'src/app/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.auth.login(this.form.value).subscribe({
      next: (res: AuthResponse) => {
       localStorage.setItem('token', res.token)
        if (res.success) {
          this.router.navigate(['/dashboard']);
        } else {
          alert(res.message);
        }

      },
      error: (err) => {
        alert('Something went wrong');
      }
    });
  }

  openForgotDialog() {
    this.dialog.open(ForgotPasswordComponent, {
      width: '400px',
    });
  }
}