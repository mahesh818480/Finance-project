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
  constructor(private ds: DataService, private dialogService: DialogService, private router: Router, private dialog: MatDialog) { }

 /*  ngOnInit() {
    // this.ds.transactions$.subscribe(data => {
    //   this.dataSource.data = data;
    // });
    this.ds.getTransactions().subscribe({
      next:(res) =>{
        console.log(res,'121::::Trans')
        if(res){
          this.dataSource.data = res
        }
      }
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
    this.dialogService.openTransactionDialog(data);
  } */

  /* ADD */
 /*  add(tx: any) {
    tx.id = Date.now();
    this.ds.addTransaction(tx);
  } */

  /* EDIT */
 /*  edit(updated: any) {
    // this.ds.updateTransaction(updated);
    this.ds.addTransaction(updated);

  } */

  /* DELETE */
/*   delete(id: number) {
    if (confirm('Delete this transaction?')) {
      this.ds.deleteTransaction(id);
    }
  } */

  // PageNation COUNT
 /*  getIndex(i: number): number {
    if (!this.paginator) return i + 1;
    return i + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
  }

  goToDocs() {
    this.router.navigate(['/docs'], { fragment: 'transactions' });
  } */

  // 🟢 LOAD DATA
  ngOnInit() {
    console.log(this.loadData(),'121:::====')
    this.loadData();
  }

  loadData() {
    this.ds.getTransactions().subscribe({
      next: (res: any) => {
        console.log(res, 'API RESPONSE');

        if (res.success) {
          this.dataSource.data = res.data; // 🔥 FIXED
        }
      },
      error: (err: any) => {
        console.log(err, 'API ERROR');
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // 🔍 SEARCH
  applyFilter(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  // 🔽 FILTER TYPE
  filterByType() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return filter ? data.type === filter : true;
    };

    this.dataSource.filter = this.filterType;
  }

  // 🟢 OPEN DIALOG
  // openDialog(data: any = null) {
  //   this.dialogService.openTransactionDialog(data);
  // }

  openDialog(data: any = null) {
    console.log("BUTTON CLICKED 🔥");
  this.dialogService.openTransactionDialog(data).subscribe(result => {
    console.log("DIALOG RESULT 🔥", result);

    if (result) {
      this.ds.addTransaction(result).subscribe(res => {
        console.log("POST RESPONSE 🔥", res);
        this.loadData();
      });
    }
  });
}

  // ➕ ADD
  add(tx: any) {
    this.ds.addTransaction(tx).subscribe(res => {
      if (res.success) {
        this.loadData(); // 🔥 REFRESH
      }
    });
  }

  // ✏️ EDIT
  edit(updated: any) {
    this.ds.addTransaction(updated).subscribe(res => {
      if (res.success) {
        this.loadData(); // 🔥 REFRESH
      }
    });
  }

  // ❌ DELETE (backend needed)
  delete(id: string) {
    if (confirm('Delete this transaction?')) {
      this.ds.deleteTransaction(id).subscribe(() => {
        this.loadData(); // 🔥 REFRESH
      });
    }
  }

  // 🔢 PAGINATION INDEX
  getIndex(i: number): number {
    if (!this.paginator) return i + 1;
    return i + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
  }

  goToDocs() {
    this.router.navigate(['/docs'], { fragment: 'transactions' });
  }
}