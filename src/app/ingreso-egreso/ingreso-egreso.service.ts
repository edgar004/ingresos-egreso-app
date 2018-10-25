import { Injectable } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
ingresoEgresoListerSubscription:Subscription= new Subscription();
ingresoEgresoItemsSubscription:Subscription= new Subscription();
  constructor(private db:AngularFirestore,
              private auth:AuthService,
              private store:Store<AppState>) { }

  crearIngresoEgreso(ingresos:IngresoEgreso){
    return this.db.doc(`${this.auth.getUsuer().uid}/ingresos-egresos`)
    .collection('items').add({...ingresos})
  
  }


  ingresoEgresoLister(){
  this.ingresoEgresoListerSubscription=this.store.select('auth')
  .pipe(
    filter(auth=>auth.user!=null)
  ).subscribe(res=>{
      this.ingresoEgresoItems(res.user.uid)
  })
  }
  
    private ingresoEgresoItems(uid:string){
      this.ingresoEgresoItemsSubscription=this.db.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(data=>{
        return data.map(doc=>{
           return {
             id:doc.payload.doc.id,
            ...doc.payload.doc.data()
           }
        })
        })
      )
      .subscribe((res:any[])=>{
        this.store.dispatch(new SetItemsAction(res))
      })
    }


    cancelarSubscription(){
      this.ingresoEgresoItemsSubscription.unsubscribe()
      this.ingresoEgresoListerSubscription.unsubscribe()
      this.store.dispatch(new UnsetItemsAction())
    }


    borrarIngresoEgreso(id:string){
      const user=this.auth.getUsuer()
      this.db.doc(`${user.uid}/ingresos-egresos/items/${id}`)
      .delete() 


    }


}
