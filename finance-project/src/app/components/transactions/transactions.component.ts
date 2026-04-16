import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

displayedColumns: string[] = ['No', 'date', 'amount', 'category', 'type', 'actions'];
dataSource = new MatTableDataSource<any>();

filterType = '';

@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(
  private ds: DataService,
  private dialogService: DialogService,
  private router: Router,
  private dialog: MatDialog
) {}

ngOnInit() {
  this.ds.loadTransactions();
  this.ds.transactions$.subscribe(data => {
    console.log(data, 'DATA::::');
    this.dataSource.data = data;
  });
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter(event: any) {
  const value = event.target.value.trim().toLowerCase();
  this.dataSource.filter = value;
}

filterByType() {
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    return filter ? data.type === filter : true;
  };

  this.dataSource.filter = this.filterType;
}

openDialog(data: any = null) {
  const dialogRef = this.dialog.open(TransactionDialogComponent, {
    width: '350px',
    data: data
  });

  dialogRef.afterClosed().subscribe(result => {
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

delete(id: number) {
  console.log(id,'===DELLL')
  if (confirm('Delete this transaction?')) {
    this.ds.deleteTransaction(id);
  }
}
// Pagenation perpose 
getIndex(i: number): number {
  if (!this.paginator) return i + 1;
  return i + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
}

goToDocs() {
  this.router.navigate(['/docs'], { fragment: 'transactions' });
}
}