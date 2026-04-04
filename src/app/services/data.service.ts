import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

@Injectable({ providedIn: 'root' })
export class DataService {

   // 🔥 LOAD FROM LOCAL STORAGE
  private loadInitialData(): Transaction[] {
    const data = localStorage.getItem('transactions');

    if (!data) return [];

    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private transactions = new BehaviorSubject<Transaction[]>(this.loadInitialData());
  transactions$ = this.transactions.asObservable();

  // SAVE METHOD LOCALSTORAGE
  private saveToLocalStorage(data: Transaction[]) {
    localStorage.setItem('transactions', JSON.stringify(data));
  }

  // ADD
  addTransaction(tx: Transaction) {
    const updated = [...this.transactions.value, tx];

    this.transactions.next(updated);
    this.saveToLocalStorage(updated);
  }

  // EDIT AND UPDATE TO LOCALSTORHGE
  updateTransaction(updatedTx: Transaction) {
    const updated = this.transactions.value.map(t =>
      t.id === updatedTx.id ? updatedTx : t
    );

    this.transactions.next(updated);
    this.saveToLocalStorage(updated);
  }

  // DELETE
  deleteTransaction(id: number) {
    const updated = this.transactions.value.filter(t => t.id !== id);
    this.transactions.next(updated);
    this.saveToLocalStorage(updated);
  }

}