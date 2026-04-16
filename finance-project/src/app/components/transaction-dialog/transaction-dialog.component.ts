import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})
export class TransactionDialogComponent {

  form: FormGroup;
  isEditMode = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      type: ['income', Validators.required]
    });
    // PATCH VALUE (Edit mode)
    if (data) {
      this.isEditMode = true;
      this.form.patchValue(data);
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // show errors
      return;
    }

    const result = {
      ...this.data,
      ...this.form.value,
      date: new Date().toISOString().split('T')[0]
    };
    console.log(result, '0000::::ResDialog')
    this.dialogRef.close(result);
  }

  close() {
    this.dialogRef.close();
  }
}
