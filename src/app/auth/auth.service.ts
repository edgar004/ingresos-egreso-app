import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUserAction, UnsetUserAction } from './auth.accions';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
subcripction:Subscription=new Subscription()
usuario:any
  constructor( private auth:AngularFireAuth,private router:Router,
               private db:AngularFirestore,
               private store:Store<AppState>,
              // private itemsService:IngresoEgresoService
     
  
  )
    
    { }


escucharUsuariosLogeados(){
  this.auth.authState.subscribe(fbUser=>{
      if(fbUser){
        this.subcripction=this.db.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe((usuarioObj:any )=>{
            const newUser=new User(usuarioObj)
            this.store.dispatch(new SetUserAction(newUser))
            this.usuario=newUser
        })
      }else{
        this.subcripction.unsubscribe()
      }
  })
}



  crearUsuario(datos){
  this.store.dispatch(new ActivarLoadingAction())
    this.auth.auth.createUserWithEmailAndPassword(datos.email,datos.password)
    .then(resp=>{
      const user:User={
       nombre:datos.nombre,
       email:resp.user.email,
       uid:resp.user.uid
      }
      this.db.doc(`${user.uid}/usuario`)
      .set(user).then(()=>{
        
        this.router.navigate(['/'])
        this.store.dispatch(new DesactivarLoadingAction())
      
      })
    }).catch(err=>{
      this.store.dispatch(new DesactivarLoadingAction())
      Swal('Error en registro',err.message,'error')
    })

  }


  login(datos){
    this.store.dispatch(new ActivarLoadingAction())
    this.auth.auth.signInWithEmailAndPassword(datos.email,datos.password)
    .then(res=>{
      this.router.navigate(['/dashboard'])
        this.store.dispatch(new DesactivarLoadingAction())
    }).catch(err=>{
      Swal('Error en el login',err.message,'error')
        this.store.dispatch(new DesactivarLoadingAction())
    })
  }

  logout(){
    this.router.navigate(['/login'])
    this.auth.auth.signOut()
    this.store.dispatch(new UnsetUserAction())
    //this.itemsService.cancelarSubscription()
  }

  validarAuth(){
    return this.auth.authState.pipe(map(user=>{
      if(user==null){
        this.router.navigate(['/login'])
      }

      return user!=null
    }))
  }


  getUsuer(){
    return {...this.usuario}
  }
}
