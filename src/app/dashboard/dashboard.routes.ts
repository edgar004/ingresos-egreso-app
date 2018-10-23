import { Routes } from '@angular/router'
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DatalleComponent } from '../ingreso-egreso/datalle/datalle.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';

export const DashboardRoutes:Routes=[
{path:'',component:EstadisticaComponent},
{path:'ingreso-egreso',component:IngresoEgresoComponent},
{path:'detalle',component:DatalleComponent}, 



]