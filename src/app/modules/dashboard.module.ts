import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HeaderComponent } from '../components/header/header.component';
import { InsightsComponent } from '../components/insights/insights.component';
import { TransactionsComponent } from '../components/transactions/transactions.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from '../components/layout/layout.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        DashboardComponent,
        TransactionsComponent,
        InsightsComponent,
        HeaderComponent,
        LayoutComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatTableModule, FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatSortModule,
        MatPaginatorModule,
        MatToolbar,
        MatToolbarModule,
        MatMenuModule
    ]
})
export class DashboardModule { }