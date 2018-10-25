import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  constructor( private store:Store<AppState>) { }
ingresos:number
egresos:number

contIngreso:number
contEgreso:number

public doughnutChartType:string = 'doughnut';
public doughnutChartLabels:string[] = ['Ingreso', 'Engreso'];
public doughnutChartData:number[] = [350, 450, 100];
  ngOnInit() {
  this.store.select('ingresoEgreso').subscribe(res=>{
    this.ingresos=0
    this.egresos=0

    this.contEgreso=0
    this.contIngreso=0
  res.items.forEach(data=>{
    if(data.tipo=='ingreso'){
      this.ingresos+=data.monto
      this.contIngreso++
    }else{
      this.egresos+=data.monto
      this.contEgreso++
    }
  })

this.doughnutChartData=[this.ingresos,this.egresos]

  })

  }

}
