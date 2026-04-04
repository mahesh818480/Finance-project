import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashBoardModule) },
  { path: 'transaction', loadChildren: () => import('./components/transactions/transactions.module').then((m) => m.TransactionModule) }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
