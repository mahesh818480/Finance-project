import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { InsightsComponent } from "../components/insights/insights.component";
import { LayoutComponent } from "../components/layout/layout.component";
import { TransactionsComponent } from "../components/transactions/transactions.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../services/auth.guard";
import { DocsComponent } from "../components/docs/docs.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'transaction',
        component: TransactionsComponent
      },
      {
        path: 'insights',
        component: InsightsComponent
      },
      {
        path:'docs',
        component:DocsComponent
      }

    ]
  }
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class DashboardRoutingModule {}