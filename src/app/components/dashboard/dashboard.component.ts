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

  displayIncome = 0;
  displayExpense = 0;
  displayBalance = 0;

  chart: any;

  constructor(
    private ds: DataService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.ds.transactions$.subscribe(data => {

      // Calculate values
      const newIncome = data
        .filter(t => t.type === 'income')
        .reduce((a, b) => a + b.amount, 0);

      const newExpense = data
        .filter(t => t.type === 'expense')
        .reduce((a, b) => a + b.amount, 0);

      const newBalance = newIncome - newExpense;

      // Store actual values
      this.income = newIncome;
      this.expense = newExpense;
      this.balance = newBalance;

      // Animate values
      this.animateValue('income', newIncome);
      this.animateValue('expense', newExpense);
      this.animateValue('balance', newBalance);

      // Load chart
      if (this.income !== 0 || this.expense !== 0) {
        this.loadChart();
      }
    });
  }

  animateValue(type: string, end: number) {
    let start = 0;

    if (end === 0) {
      if (type === 'income') this.displayIncome = 0;
      if (type === 'expense') this.displayExpense = 0;
      if (type === 'balance') this.displayBalance = 0;
      return;
    }

    const duration = 2000;
    const steps = 40;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      const value = Math.floor(start);

      if (type === 'income') this.displayIncome = value;
      if (type === 'expense') this.displayExpense = value;
      if (type === 'balance') this.displayBalance = value;

    }, duration / steps);
  }

  // CHART
  loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    setTimeout(() => {
      this.chart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: ['Income', 'Expense'],
          datasets: [{
            label: 'Finance',
            data: [50000, this.expense],
            backgroundColor: ['#6e829d', '#d878a9'],
          }]
        }
      });
    }, 0);
  }

  // ADD TRANSACTION
  openDialog(data: any = null) {
    this.dialogService.openTransactionDialog(data);
  }
}