import { Injectable } from '@angular/core';
import { TransactionDialogComponent } from '../components/transaction-dialog/transaction-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
    private ds: DataService
  ) { }

  openDialog(data: any = null) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('DIALOG RESULT:', result); 
      if (result) {
        if (data) {
          result._id = data._id;
          this.ds.updateTransaction(result);
        } else {
          this.ds.addTransaction(result); 
        }
      }
    });
  }
}
