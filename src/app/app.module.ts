import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { InsightsComponent } from './components/insights/insights.component';
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RoleSwitchComponent } from './components/role-switch/role-switch.component';
import { DashBoardModule } from './components/dashboard/dashboard.module';
import { TransactionModule } from './components/transactions/transactions.module';
@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    HeaderComponent,
    InsightsComponent,
    // TransactionsComponent,
    RoleSwitchComponent,
    TransactionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DashBoardModule,
    TransactionModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
