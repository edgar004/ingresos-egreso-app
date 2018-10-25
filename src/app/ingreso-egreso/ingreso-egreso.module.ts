import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DatalleComponent } from './datalle/datalle.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ChartsModule} from 'ng2-charts'
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso',ingresoEgresoReducer)
    
  ],
  declarations: [
    DashboardComponent, 
    IngresoEgresoComponent,
    EstadisticaComponent,
    DatalleComponent,
    
  ],
  exports:[
    DashboardComponent, 
    IngresoEgresoComponent,
    EstadisticaComponent,
    DatalleComponent,
    
  ]
})
export class IngresoEgresoModule { }
