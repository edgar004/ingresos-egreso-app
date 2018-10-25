import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routes';
import { AuthGuardsGuard } from '../auth/auth-guards.guard';


const routes:Routes=[
  {path:'',component:DashboardComponent,
  children:DashboardRoutes,
 // canActivate:[AuthGuardsGuard]

}
]
@NgModule({
  imports: [
    RouterModule.forChild(routes) 
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class DashboardRoutingModule { }
