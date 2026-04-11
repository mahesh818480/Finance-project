import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

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

  ngOnInit() {
    // this.ds.transactions$.subscribe(data => {
    //   this.dataSource.data = data;
    // });
    this.ds.getTransactions().subscribe({
      next:(res) =>{
        console.log(res,'===>>')
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
  }

  /* ADD */
  add(tx: any) {
    tx.id = Date.now();
    this.ds.addTransaction(tx);
  }

  /* EDIT */
  edit(updated: any) {
    this.ds.updateTransaction(updated);
  }

  /* DELETE */
  delete(id: number) {
    if (confirm('Delete this transaction?')) {
      this.ds.deleteTransaction(id);
    }
  }

  // PageNation COUNT
  getIndex(i: number): number {
    if (!this.paginator) return i + 1;
    return i + 1 + (this.paginator.pageIndex * this.paginator.pageSize);
  }

  goToDocs() {
    this.router.navigate(['/docs'], { fragment: 'transactions' });
  }
}