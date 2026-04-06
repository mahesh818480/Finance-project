import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form!:FormGroup
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

    const res = this.auth.register(this.form.value);

    if (res.success) {
      alert('Registered Successfully ✅');
      this.router.navigate(['/login']);
    } else {
      alert(res.message);
    }
  }
}