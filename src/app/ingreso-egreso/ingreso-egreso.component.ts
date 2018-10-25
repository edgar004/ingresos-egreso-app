import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {
forma:FormGroup
tipo='ingreso'
loadingSubs:Subscription=new Subscription()
cargando:boolean
  constructor(private ingresoService:IngresoEgresoService,private store:Store<AppState>) { }

  ngOnInit() {
    this.loadingSubs=this.store.select('ui').subscribe(ui=>{
      this.cargando=ui.isLoading
    })
    
    this.forma=new FormGroup({
      'descripcion':new FormControl('',Validators.required),
      'monto':new FormControl(0,Validators.minLength(1))
    })

  }

  ngOnDestroy(){
    this.loadingSubs.unsubscribe()
  }


  crearIngresoEgreso(){
    this.store.dispatch(new ActivarLoadingAction())
    const ingresoEgreso=new IngresoEgreso({...this.forma.value,tipo:this.tipo})
    this.ingresoService.crearIngresoEgreso(ingresoEgreso).then(()=>{
      this.store.dispatch(new DesactivarLoadingAction())
      this.forma.reset({
        monto:0
      })
    })
  
  }

}
