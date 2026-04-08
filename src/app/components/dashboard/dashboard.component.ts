import { Component, OnInit } from '@angular/core';
import { DataService, Transaction } from '../../services/data.service';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  income = 0;
  expense = 0;
  balance = 0;

  chart: any;

  constructor(private ds: DataService,private route: Router,private dialogService: DialogService) {}

  ngOnInit() {
    this.ds.transactions$.subscribe(data => {

      this.income = data
        .filter(t => t.type === 'income')
        .reduce((a, b) => a + b.amount, 0);

      this.expense = data
        .filter(t => t.type === 'expense')
        .reduce((a, b) => a + b.amount, 0);

      this.balance = this.income - this.expense;

      if (this.income !== 0 || this.expense !== 0) {
        this.loadChart();
      }
    });
  }

  loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }
setTimeout(() =>{
  console.log(this.income,'===',this.expense)
  this.chart = new Chart('myChart', {
    type: 'bar',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        label: 'Finance',
        data: [this.income, this.expense],
        backgroundColor: ['#6e829d', '#d878a9'],
      }]
    }
  });
},0)
  }
  openDialog(data: any = null) {
    this.dialogService.openTransactionDialog(data);
  }

}