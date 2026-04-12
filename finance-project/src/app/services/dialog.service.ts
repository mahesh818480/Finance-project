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
  ) {}

  // openTransactionDialog(data: any = null) {
  //   const dialogRef = this.dialog.open(TransactionDialogComponent, {
  //     width: '350px',
  //     data: data
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       if (data) {
  //         this.ds.addTransaction(result).subscribe((res) =>console.log(res,'121:::Dialog===>>'));
  //       } else {
  //         result.id = Date.now();
  //         this.ds.addTransaction(result);
  //       }
  //     }
  //   });
  // }
  openTransactionDialog(data: any = null) {
  return this.dialog.open(TransactionDialogComponent, {
    width: '350px',
    data: data
  }).afterClosed();
}
}
