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

  public transactions = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactions.asObservable();
  private loadInitialData(): Transaction[] {
    const email = this.getCurrentUserEmail();
    if (!email) return [];
    const data = localStorage.getItem('transactions' + email);
    return data ? JSON.parse(data) : [];
  }

  initUserData() {
    const email = this.getCurrentUserEmail();
    if (!email) {
      console.log('No user found ❌');
      this.transactions.next([]);
      return;
    }
    const data = localStorage.getItem('transactions_' + email);
    const parsed = data ? JSON.parse(data) : [];
    console.log(parsed, 'INIT DATA ✅');
    this.transactions.next(parsed);
  }

  // CURRENT USER EMAIL
  private getCurrentUserEmail(): string {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(user, 'CURRENT USER 🔥');
    return user?.email || '';
  }

  // SAVE METHOD LOCALSTORAGE
  private saveToLocalStorage(data: Transaction[]) {
    const email = this.getCurrentUserEmail();

    if (!email) return;

    localStorage.setItem('transactions_' + email, JSON.stringify(data));
  }
  
  getUserName() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.name
  }

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

  // WHEN WE REFRESH THE PAGE THEN DATA IS EMPTY SO THAT PERPOSE
  reloadUserData() {
    const data = this.loadInitialData();
    this.transactions.next(data);
  }

}