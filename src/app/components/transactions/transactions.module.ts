import { NgModule } from "@angular/core";
import { TransactionRoutingModule } from "./transaction-routing.module";
import { TransactionsComponent } from "./transactions.component";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, TransactionRoutingModule, MatTableModule, FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatSortModule,
        MatPaginatorModule,],
    declarations: [TransactionsComponent]
})

export class TransactionModule { }