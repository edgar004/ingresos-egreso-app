import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators'
import Swal from 'sweetalert2'
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth:AngularFireAuth,private router:Router,private db:AngularFirestore) { }


escucharUsuariosLogeados(){
  this.auth.authState.subscribe(fbUser=>{
    console.log(fbUser);
    
  })
}



  crearUsuario(datos){

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
      
      })
    }).catch(err=>{
      Swal('Error en registro',err.message,'error')
    })

  }


  login(datos){
    this.auth.auth.signInWithEmailAndPassword(datos.email,datos.password)
    .then(res=>{
      this.router.navigate(['/dashboard'])
    }).catch(err=>{
      Swal('Error en el login',err.message,'error')
    })
  }

  logout(){
    this.router.navigate(['/login'])
    this.auth.auth.signOut()
  }

  validarAuth(){
    return this.auth.authState.pipe(map(user=>{
      if(user==null){
        this.router.navigate(['/login'])
      }

      return user!=null
    }))
  }
}
