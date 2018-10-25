import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import *  as fromIngresoEgreso from '../ingreso-egreso.reducer'
@Component({
  selector: 'app-datalle',
  templateUrl: './datalle.component.html',
  styles: []
})
export class DatalleComponent implements OnInit,OnDestroy {
detalles:any[]=[]
subscription:Subscription=new Subscription()
  constructor(private store:Store<fromIngresoEgreso.AppState>,
              private ingresoEgresoService:IngresoEgresoService) {


   }

  ngOnInit() {
    this.subscription=this.store.select('ingresoEgreso').subscribe(rep=>{
      this.detalles=rep.items
      
    })
  }

  borrarItem(id){
  this.ingresoEgresoService.borrarIngresoEgreso(id)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
