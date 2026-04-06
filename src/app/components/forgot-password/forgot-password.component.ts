import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  hide1 = true;
  hide2 = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {}

  forgetPassword = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  submit() {
    if (this.forgetPassword.invalid) {
      this.forgetPassword.markAllAsTouched();
      return;
    }

    const { email, newPassword, confirmPassword } = this.forgetPassword.value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match ❌');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      alert('User not found ❌');
      return;
    }

    user.password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    alert('Password updated successfully ✅');
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
