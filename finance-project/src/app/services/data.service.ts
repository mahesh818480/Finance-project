import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  _id: string
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private API_URL = 'http://localhost:3000/api/transactions';

  public transactions = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactions.asObservable();

  constructor(private http: HttpClient) {
  }

  // initially get data 
  loadTransactions() {
    this.http.get<any>(this.API_URL)
      .subscribe(res => {
        this.transactions.next(res.data || []);
      });
  }

  // when we user add the transation
  addTransaction(tx: Transaction) {
    this.http.post(`${this.API_URL}/create`, tx)
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  // when we remove the transations
  deleteTransaction(id: number) {
    this.http.delete(`${this.API_URL}/delete/${id}`)
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  // when we update the transations
  updateTransaction(tx: Transaction) {
    this.http.put(`${this.API_URL}/update/${tx._id}`, tx)
      .subscribe(() => this.loadTransactions());
  }
}