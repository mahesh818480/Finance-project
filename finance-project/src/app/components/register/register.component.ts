import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form!: FormGroup
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.auth.register(this.form.value).subscribe({
      next: (res: AuthResponse) => {
        if (res.success) {
          alert('Registered Successfully ✅');
          this.router.navigate(['/login']);
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        alert(err.message);
      }
    })
  }
}