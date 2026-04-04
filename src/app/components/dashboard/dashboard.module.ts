import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
// import { RoleSwitchComponent } from "../role-switch/role-switch.component";
// import { RoleSwitchComponent } from "../role-switch/role-switch.component";

@NgModule({
    imports:[CommonModule,DashboardRoutingModule, MatButtonModule,],
    declarations:[DashboardComponent]
})

export class DashBoardModule{}